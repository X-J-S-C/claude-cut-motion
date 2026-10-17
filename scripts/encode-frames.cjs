/**
 * Optional: encode an existing `element-<n>.png` sequence into the master MP4,
 * with frame-count and dummy-frame verification.
 *
 * `npx remotion render ... --sequence` writes one PNG per frame; this helper turns
 * that sequence into the deliverable video and prints the ffprobe numbers for
 * out/REPORT.md. It is a convenience, not a required step — `npm run render`
 * produces the MP4 directly with Remotion's own encoder.
 *
 *   node scripts/encode-frames.cjs [--frames-dir out/frames] [--out out/master.mp4]
 *                                  [--fps 30] [--crf 16] [--allow-missing]
 *
 * Steps: (1) check that every frame exists and is bigger than DUMMY_BYTES,
 * (2) encode with ffmpeg, (3) print ffprobe numbers.
 * Exit codes: 0 ok, 1 encode failed, 2 frame set incomplete.
 */
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const ROOT = path.resolve(__dirname, "..");
const argv = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback;
};
const flag = (name) => argv.includes(`--${name}`);

const framesDir = path.resolve(ROOT, arg("frames-dir", "out/frames"));
const outFile = path.resolve(ROOT, arg("out", "out/master.mp4"));
const fps = arg("fps", "30");
const crf = arg("crf", "16");
const expected = Number(arg("frames", "900"));
const DUMMY_BYTES = 20_000; // a real 1920x1080 frame here is ~200 KB
const FFMPEG = process.env.FFMPEG_PATH || "ffmpeg";
const FFPROBE = process.env.FFPROBE_PATH || "ffprobe";

const log = (...a) => console.log("[encode]", ...a);

if (!fs.existsSync(framesDir)) {
  console.error(`[encode] frames dir not found: ${framesDir}`);
  process.exit(2);
}

// Remotion zero-pads the sequence index (element-000.png), so infer the width
// from a sample instead of assuming no padding.
const files = fs.readdirSync(framesDir).filter((f) => /^element-\d+\.png$/.test(f));
const byIndex = new Map();
for (const f of files) byIndex.set(Number(f.match(/element-(\d+)\.png/)[1]), f);
const pad = files.length ? files[0].match(/element-(\d+)\.png/)[1].length : 3;
const frameName = (i) => `element-${String(i).padStart(pad, "0")}.png`;
const pattern = `element-%0${pad}d.png`;

const missing = [];
const duds = [];
for (let i = 0; i < expected; i++) {
  const name = frameName(i);
  if (!byIndex.has(i)) {
    missing.push(name);
    continue;
  }
  const size = fs.statSync(path.join(framesDir, name)).size;
  if (size < DUMMY_BYTES) duds.push(`${name} (${size} B)`);
}

log(`frames dir : ${framesDir}`);
log(`found      : ${byIndex.size} element-N.png files, expecting ${expected}`);
if (missing.length) log(`missing    : ${missing.length} -> ${missing.slice(0, 8).join(", ")}${missing.length > 8 ? " …" : ""}`);
if (duds.length) log(`truncated  : ${duds.length} -> ${duds.join(", ")}`);

if ((missing.length || duds.length) && !flag("allow-missing")) {
  const reRender = [...missing, ...duds.map((d) => d.split(" ")[0])]
    .map((n) => Number(n.match(/element-(\d+)\.png/)[1]))
    .filter((n) => Number.isFinite(n))
    .sort((a, b) => a - b);
  const ranges = reRender.reduce((acc, n) => {
    const last = acc[acc.length - 1];
    if (last && n === last[1] + 1) last[1] = n;
    else acc.push([n, n]);
    return acc;
  }, []);
  log("re-render these ranges, then run this script again:");
  for (const [a, b] of ranges) log(`  --frames=${a}-${b}`);
  process.exit(2);
}

fs.mkdirSync(path.dirname(outFile), { recursive: true });
const first = Math.min(...byIndex.keys());
const ffArgs = [
  "-y",
  "-hide_banner",
  "-loglevel",
  "error",
  "-framerate",
  fps,
  "-start_number",
  String(first),
  "-i",
  path.join(framesDir, pattern),
  "-frames:v",
  String(expected),
  "-c:v",
  "libx264",
  "-preset",
  "medium",
  "-crf",
  crf,
  "-pix_fmt",
  "yuv420p",
  "-movflags",
  "+faststart",
  outFile,
];
log("ffmpeg " + ffArgs.join(" "));
const enc = spawnSync(FFMPEG, ffArgs, { stdio: "inherit" });
if (enc.status !== 0) {
  console.error(`[encode] ffmpeg exited ${enc.status}`);
  process.exit(1);
}

const probe = spawnSync(
  FFPROBE,
  [
    "-v",
    "error",
    "-select_streams",
    "v:0",
    "-count_frames",
    "-show_entries",
    "stream=codec_name,width,height,r_frame_rate,avg_frame_rate,nb_read_frames,pix_fmt",
    "-show_entries",
    "format=duration,size",
    "-of",
    "default=noprint_wrappers=1",
    outFile,
  ],
  { encoding: "utf8" },
);
log("wrote " + outFile);
console.log(probe.stdout.trim());
