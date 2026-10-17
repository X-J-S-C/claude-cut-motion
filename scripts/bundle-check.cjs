// Bundles the composition with rspack (in-process) to prove the tree compiles
// and every import resolves. Used as a cheap pre-flight before a real render.
const path = require("node:path");
const { bundle } = require("@remotion/bundler");

bundle({
  entryPoint: path.resolve(__dirname, "..", "src", "index.ts"),
  outDir: path.resolve(__dirname, "..", "out", ".bundlecheck"),
  onProgress: () => undefined,
  enableCaching: false,
  rspack: true,
})
  .then((p) => {
    console.log("BUNDLE OK ->", p);
  })
  .catch((e) => {
    console.error("BUNDLE FAIL:", e && e.message);
    process.exit(1);
  });
