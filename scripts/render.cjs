#!/usr/bin/env node
/**
 * Render driver for this composition.
 *
 * `npm run render` -> this script. Two modes:
 *
 *  1. DEFAULT (any normal machine): it simply hands over to the official
 *     `remotion render` CLI, so behaviour is exactly what Remotion documents.
 *
 *  2. SANDBOX (`--no-spawn` / DSH_NO_SPAWN=1): for locked-down environments
 *     where a Node process is not allowed to create child processes with piped
 *     stdio (Windows sandboxes, CI jails...). In that case `remotion render`
 *     cannot work at all, because (a) Remotion's browser launcher spawns Chrome
 *     with pipes and (b) its Rust compositor speaks JSON over pipes. This mode
 *     side-steps both:
 *       - bundling runs on rspack/SWC, entirely in-process (no esbuild service),
 *       - Chrome is spawned with `stdio: 'ignore'` and driven over a WebSocket
 *         (CDP on localhost) instead of pipes,
 *       - frames are rendered as a PNG sequence by @remotion/renderer's
 *         `renderFrames()`, and the encode step is delegated to the system
 *         ffmpeg binary (always spawned with inherited stdio).
 *
 *  Usage:
 *    node scripts/render.cjs                     # video -> out/master.mp4
 *    node scripts/render.cjs --stills 5.0,17.0   # stills  -> out/stills/t05.00.png
 *    node scripts/render.cjs --sandbox           # force mode 2
 */
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawn, spawnSync } = require("node:child_process");
const http = require("node:http");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "out");
const FRAMES = path.join(ROOT, "out", "frames");
const COMPOSITION_ID = "ClaudeCutMotion";
const ENTRY = path.join(ROOT, "src", "index.ts");

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const value = (name, fallback = null) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

const sandboxMode =
  flag("sandbox") || process.env.DSH_NO_SPAWN === "1" || process.env.REMOTION_BROWSER_WS !== undefined;

/* ------------------------------------------------------------------ helpers */

const log = (...a) => console.log("[render]", ...a);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function findChrome() {
  const candidates = [
    process.env.REMOTION_BROWSER_EXECUTABLE,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    path.join(process.env.LOCALAPPDATA ?? "", "Google/Chrome/Application/chrome.exe"),
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].filter(Boolean);
  for (const c of candidates) if (fs.existsSync(c)) return c;
  throw new Error("No Chrome/Chromium binary found; set REMOTION_BROWSER_EXECUTABLE.");
}

/** Spawn Chrome without pipes (allowed even in piped-spawn-hostile sandboxes). */
async function launchChromeForCdp() {
  if (process.env.REMOTION_BROWSER_WS) return { wsEndpoint: process.env.REMOTION_BROWSER_WS, kill: () => {} };
  const exe = findChrome();
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "remotion-sandbox-chrome-"));
  const chromeArgs = [
    "--headless=new",
    "--single-process",
    "--no-zygote",
    "--no-sandbox",
    "--disable-gpu",
    "--disable-breakpad",
    "--disable-crash-reporter",
    "--disable-dev-shm-usage",
    "--hide-scrollbars",
    "--mute-audio",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-extensions",
    "--disable-background-timer-throttling",
    "--disable-renderer-backgrounding",
    "--disable-backgrounding-occluded-windows",
    "--force-color-profile=srgb",
    "--remote-debugging-port=0",
    `--user-data-dir=${userDataDir}`,
    "about:blank",
  ];
  const proc = spawn(exe, chromeArgs, { stdio: "ignore", detached: false });
  const portFile = path.join(userDataDir, "DevToolsActivePort");
  let raw = null;
  for (let i = 0; i < 200; i++) {
    if (fs.existsSync(portFile)) {
      const content = fs.readFileSync(portFile, "utf8").trim().split(/\r?\n/);
      if (content.length >= 2 && content[0]) {
        raw = content;
        break;
      }
    }
    await sleep(100);
  }
  if (!raw) throw new Error("Chrome did not expose a DevTools endpoint in time");
  const wsEndpoint = `ws://127.0.0.1:${raw[0]}${raw[1]}`;
  log("chrome cdp endpoint", wsEndpoint);
  return { wsEndpoint, kill: () => proc.kill() };
}

/**
 * Teach @remotion/renderer to attach to our already running Chrome instead of
 * spawning one with pipes.
 */
async function attachRemotionToCdp(wsEndpoint) {
  // Deep-require by absolute path: @remotion/renderer's "exports" map does not
  // expose its internals, but we need the very classes its browser launcher uses.
  const distDir = path.dirname(require.resolve("@remotion/renderer"));
  const BrowserRunner = require(path.join(distDir, "browser", "BrowserRunner.js"));
  const { Connection } = require(path.join(distDir, "browser", "Connection.js"));
  const { NodeWebSocketTransport } = require(path.join(distDir, "browser", "NodeWebSocketTransport.js"));
  const transport = await NodeWebSocketTransport.create(wsEndpoint);
  const connection = new Connection(transport);
  BrowserRunner.makeBrowserRunner = async () => ({
    listeners: [],
    deleteBrowserCaches: () => undefined,
    forgetEventLoop: () => undefined,
    rememberEventLoop: () => undefined,
    connection,
    closeProcess: async () => undefined,
  });
  return connection;
}

async function bundleProject() {
  const { bundle } = require("@remotion/bundler");
  const outDir = path.join(ROOT, "node_modules", ".remotion-bundle");
  fs.rmSync(outDir, { recursive: true, force: true });
  return bundle({
    entryPoint: ENTRY,
    outDir,
    onProgress: () => undefined,
    enableCaching: false,
    rspack: true,
    publicDir: null,
    rootDir: ROOT,
  });
}

function ffmpegEncode(framesDir, output) {
  const files = fs
    .readdirSync(framesDir)
    .filter((f) => f.endsWith(".png"))
    .sort();
  if (files.length === 0) throw new Error("no frames rendered");
  const ffmpeg = process.env.FFMPEG_PATH || "ffmpeg";
  const argv = [
    "-y",
    "-hide_banner",
    "-loglevel",
    "error",
    "-framerate",
    "30",
    "-start_number",
    "0",
    "-i",
    path.join(framesDir, "element-%d.png"),
    "-frames:v",
    String(files.length),
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    "16",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    output,
  ];
  log("ffmpeg", argv.join(" "));
  const res = spawnSync(ffmpeg, argv, { stdio: "inherit", cwd: ROOT });
  if (res.status !== 0) throw new Error(`ffmpeg failed with status ${res.status}`);
}

/* ------------------------------------------------------------------- modes */

async function runNormal() {
  const cli = require.resolve("@remotion/cli/remotion-cli.js");
  const argv = [cli, "render", "src/index.ts", COMPOSITION_ID, "out/master.mp4", "--log=info"];
  const res = spawnSync(process.execPath, argv, { stdio: "inherit", cwd: ROOT });
  process.exit(res.status ?? 1);
}

async function runSandbox() {
  const { renderFrames, renderStill, selectComposition, openBrowser } = require("@remotion/renderer");
  const stillsArg = value("stills");
  const chrome = await launchChromeForCdp();
  await attachRemotionToCdp(chrome.wsEndpoint);
  log("bundling (rspack/swc, in-process)");
  const serveUrl = await bundleProject();

  const browser = await openBrowser("chrome", {
    browserExecutable: findChrome(),
    chromiumOptions: { gl: "swangle", headless: true },
    forceDeviceScaleFactor: 1,
    logLevel: "info",
  });
  const composition = await selectComposition({ serveUrl, id: COMPOSITION_ID, puppeteerInstance: browser });
  log("composition", JSON.stringify(composition));

  if (stillsArg) {
    fs.mkdirSync(path.join(OUT, "stills"), { recursive: true });
    for (const t of stillsArg.split(",").map((s) => Number(s))) {
      const frame = Math.round(t * composition.fps);
      const name = `t${t.toFixed(2).padStart(5, "0")}.png`;
      const output = path.join(OUT, "stills", name);
      await renderStill({ serveUrl, composition, frame, output, puppeteerInstance: browser, imageFormat: "png" });
      log("still", name, "(frame " + frame + ")");
    }
    await browser.close({ silent: true });
    chrome.kill();
    return;
  }

  fs.rmSync(FRAMES, { recursive: true, force: true });
  fs.mkdirSync(FRAMES, { recursive: true });
  await renderFrames({
    serveUrl,
    composition,
    inputProps: {},
    outputDir: FRAMES,
    imageFormat: "png",
    puppeteerInstance: browser,
    concurrency: Number(process.env.RENDER_CONCURRENCY ?? 4),
    onFrameUpdate: (n) => {
      if (n % 60 === 0) log(`rendered ${n} frames`);
    },
  });
  await browser.close({ silent: true });
  chrome.kill();
  fs.mkdirSync(OUT, { recursive: true });
  ffmpegEncode(FRAMES, path.join(OUT, "master.mp4"));
  log("wrote out/master.mp4");
}

(async () => {
  try {
    if (sandboxMode) await runSandbox();
    else await runNormal();
  } catch (err) {
    console.error("[render] FAILED:", err && err.stack ? err.stack : err);
    process.exit(1);
  }
})();
