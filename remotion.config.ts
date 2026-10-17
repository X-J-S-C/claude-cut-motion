import { Config } from "@remotion/cli/config";

// 1920x1080 masters are produced by writing a 1280x720 design space and scaling
// the root by 1.5, so every measurement taken from the reference (which is a
// 1280x720 frame) maps 1:1 onto the authored scene.
Config.setVideoImageFormat("png");
Config.setPixelFormat("yuv420p");
Config.setCodec("h264");
Config.setConcurrency(4);
// Deterministic, offline-friendly: no network and no GPU-only paths.
Config.setBrowserExecutable(process.env.REMOTION_BROWSER_EXECUTABLE ?? null);
Config.setChromiumOpenGlRenderer("swangle");
Config.setDelayRenderTimeoutInMilliseconds(60000);
Config.setOverwriteOutput(true);
