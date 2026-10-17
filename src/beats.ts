/**
 * Timing layer: 30 s @ 30 fps, driven only by the current frame.
 *
 * Numbers come from the frame-accurate analysis of the reference clip:
 * beat sheet, mascot choreography, sticker events, camera moves and the
 * phone-content timeline. Everything here is a pure function of the frame.
 */
import { track } from "./anim";

export const FPS = 30;
export const DESIGN_WIDTH = 1280;
export const DESIGN_HEIGHT = 720;
export const TOTAL_FRAMES = 900;

/** seconds -> frame */
export const f = (sec: number) => Math.round(sec * FPS);

/* ------------------------------------------------------------------ camera */
/* screen = (canvas - F) * s + (640, 360)   |   s=1, F=(640,360) == t 1.00    */

export type CamKey = { t: number; s: number; fx: number; fy: number };

export const CAMERA: CamKey[] = [
  { t: 0.0, s: 1.0, fx: 640, fy: 360 }, // identity: keeps A1/A4 true
  { t: 1.6, s: 1.0, fx: 640, fy: 360 },
  { t: 2.0, s: 1.018, fx: 631, fy: 372 },
  { t: 2.4, s: 1.107, fx: 585, fy: 392 }, // M1 push-in, then hold
  { t: 5.0, s: 1.107, fx: 585, fy: 392 },
  { t: 5.5, s: 1.263, fx: 520, fy: 415 }, // M2 push to timeline
  { t: 6.0, s: 1.287, fx: 510, fy: 419 },
  { t: 7.5, s: 1.287, fx: 510, fy: 419 },
  { t: 8.0, s: 1.196, fx: 548, fy: 380 }, // M3 pull-back
  { t: 8.5, s: 1.223, fx: 530, fy: 371 },
  { t: 9.0, s: 1.267, fx: 504, fy: 358 },
  { t: 12.0, s: 1.267, fx: 504, fy: 358 },
  { t: 12.6, s: 1.341, fx: 604, fy: 335 }, // M4 to the 文字 presets
  { t: 15.0, s: 1.341, fx: 604, fy: 335 },
  { t: 15.3, s: 1.34, fx: 604, fy: 335 },
  { t: 16.1, s: 1.4, fx: 809, fy: 268 }, // M5 pan-right to 调整
  { t: 16.5, s: 1.361, fx: 796, fy: 268 },
  { t: 18.0, s: 1.47, fx: 828, fy: 268 }, // creep + peak
  { t: 19.5, s: 1.44, fx: 822, fy: 268 },
  { t: 20.0, s: 1.076, fx: 661, fy: 392 }, // M6 pull-back to the timeline
  { t: 20.5, s: 1.072, fx: 657, fy: 392 },
  { t: 23.0, s: 1.072, fx: 657, fy: 392 }, // frozen (H2)
  { t: 23.5, s: 1.258, fx: 757, fy: 298 },
  { t: 24.0, s: 1.26, fx: 758, fy: 279 }, // M7 push to render
  { t: 26.0, s: 1.39, fx: 805, fy: 255 },
  { t: 26.6, s: 1.0, fx: 640, fy: 360 }, // M8 zoom-out to neutral
  { t: 30.0, s: 1.0, fx: 640, fy: 360 },
];

/* --------------------------------------------------------- phone self-anim */
/* The phone is NOT rigid and NOT part of the camera (SPEC §0, §6.5).        */

export type PhonePose = { w: number; h: number; cx: number; cy: number };

export const phonePose = (frame: number): PhonePose => {
  const t = frame / FPS;
  const easeOutBack = (k: number) => {
    const c = 1.42;
    return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2);
  };
  if (t <= 26.1) {
    // 215x337 at t=1.00 (freshly measured) easing to 198x302 by t=2.00 (checklist D1)
    const k = Math.min(1, Math.max(0, (t - 1.0) / 1.0));
    return {
      w: 215 + (198 - 215) * k,
      h: 337 + (302 - 337) * k,
      cx: 640.5 + (645 - 640.5) * k,
      cy: 207.5 + (217 - 207.5) * k,
    };
  }
  const k = Math.min(1, (t - 26.1) / 1.5);
  const e = easeOutBack(k);
  return {
    // hero size stays 310x465 so checklist D6 (width 300-320 at t=28.5) still holds
    w: 198 + (310 - 198) * e,
    h: 302 + (465 - 302) * e,
    cx: 645 + (605 - 645) * e,
    cy: 217 + (362 - 217) * e,
  };
};

/* ----------------------------------------------------------- button states */

export type ButtonState = "export" | "rendering" | "rendering999" | "done";
export const buttonState = (frame: number): ButtonState => {
  const t = frame / FPS;
  if (t < 24.1) return "export";
  if (t < 25.3) return "rendering";
  if (t < 26.15) return "rendering999";
  return "done";
};

/** app fades back to 22 % while the hero ending plays (B36, G5) */
export const appOpacity = (frame: number): number => {
  const t = frame / FPS;
  if (t < 26.5) return 1;
  const k = Math.min(1, (t - 26.5) / 0.7);
  return 1 - k * 0.78;
};

/** ------------------------------------------------------------ right panel */
/**
 * The reference's 调整 panel is not rigid: it is ~251 px wide when it is the
 * hero of the frame (t <= 2.8 and t >= 13) but only ~150 px while the camera is
 * pushed onto the timeline, where a rigid panel would spill off-frame.
 */
export const rightPanelRect = (frame: number) => {
  const t = frame / FPS;
  const right = track(frame, [
    [f(2.8), 1266],
    [f(4.0), 1152],
    [f(12.6), 1152],
    [f(13.2), 1266],
  ]);
  const width = t <= 2.8 ? 251 : t < 4.0 ? 251 - 101 * ((t - 2.8) / 1.2) : t < 12.6 ? 150 : 251;
  return { x0: right - width, x1: right, y0: 68.6, y1: 369 };
};

/* ------------------------------------------------------------- left panel */

export type Tab = "studio" | "transition" | "text";
export const activeTab = (frame: number): Tab => {
  const t = frame / FPS;
  if (t < 8.5) return "studio";
  if (t < 12.4) return "transition";
  return "text";
};

/* -------------------------------------------------------------- timeline */

/** clips / audio / text pill / 卡点 construction order (H4) */
export const presentAt = {
  clips: (frame: number) => frame / FPS >= 2.6,
  audio: (frame: number) => frame / FPS >= 3.9,
  textPill: (frame: number) => frame / FPS >= 13.6,
  kadian: (frame: number) => frame / FPS >= 20.2,
};

/** playhead x in canvas px: parks at 0 s, then drifts right (SPEC §1.5) */
export const playheadX = (frame: number) =>
  track(frame, [
    [0, 100],
    [f(1.4), 100],
    [f(5.0), 100],
    [f(9.0), 378],
    [f(23.0), 842],
    [f(30.0), 1010],
  ]);

export const playheadSec = (frame: number) => (playheadX(frame) - 100) / 70.7;

/** title-bar timecode: tc ≈ t + 0.233 s, frames mod 30 (SPEC §10.3) */
export const timecodeString = (frame: number) => {
  const total = frame;
  const ff = total % FPS;
  const secs = Math.floor(total / FPS);
  const p2 = (v: number) => String(v).padStart(2, "0");
  return `${p2(Math.floor(secs / 3600))}:${p2(Math.floor((secs % 3600) / 60))}:${p2(
    secs % 60,
  )}:${p2(ff)}`;
};

/* ----------------------------------------------------------------- sliders */

export const sliderValues = (frame: number) => {
  const t = frame / FPS;
  return {
    flash: t < 16.2 ? 0 : Math.min(70, ((t - 16.2) / 0.8) * 70),
    // 100 -> 225 (overshoot gag) -> back to 110
    saturation:
      t < 17.0
        ? 100
        : t < 17.8
          ? 100 + ((t - 17.0) / 0.8) * 125
          : t < 18.2
            ? 225
            : t < 19.0
              ? 225 - ((t - 18.2) / 0.8) * 115
              : 110,
    // 0 -> 43 -> 22 (dial-back beat) -> 60
    punch:
      t < 18.4
        ? 0
        : t < 18.8
          ? ((t - 18.4) / 0.4) * 43
          : t < 19.0
            ? 43 - ((t - 18.8) / 0.2) * 21
            : t < 19.6
              ? 22 + ((t - 19.0) / 0.6) * 38
              : 60,
    speed: 1.0,
  };
};

export const sliderText = (key: "flash" | "saturation" | "punch" | "speed", v: number) => {
  if (key === "speed") return `${v.toFixed(1)}x`;
  return `${Math.round(v)}%`;
};

/* ------------------------------------------------------------ phone scenes */

export type SceneId = "empty" | "night" | "ramen" | "corgi" | "disco";
export const SCENES: ReadonlyArray<{ t: number; scene: SceneId }> = [
  { t: 0, scene: "empty" },
  { t: 3.05, scene: "night" },
  { t: 6.9, scene: "ramen" },
  { t: 11.4, scene: "disco" },
  { t: 13.2, scene: "corgi" },
  { t: 13.9, scene: "disco" },
  { t: 21.7, scene: "corgi" },
  { t: 23.4, scene: "disco" },
];

export const sceneAt = (frame: number): SceneId => {
  const t = frame / FPS;
  let out: SceneId = "empty";
  for (const s of SCENES) if (t >= s.t) out = s.scene;
  return out;
};

/** 前方高能预警 caption inside the phone: on 13.6–14.0 and 21.8–23.4 (S22) */
export const phoneCaptionOn = (frame: number) => {
  const t = frame / FPS;
  return (t >= 13.6 && t < 14.0) || (t >= 21.8 && t < 23.4);
};
