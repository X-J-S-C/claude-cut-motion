/**
 * Every rect in the composition, verbatim from SPEC §1 (canvas px = the screen
 * pixels of reference frame t=1.00, where the camera is the identity).
 *
 * Keeping these in one file means a still can be checked against the spec table
 * line by line.
 */

export type Rect = { x0: number; y0: number; x1: number; y1: number };
export const w = (r: Rect) => r.x1 - r.x0;
export const h = (r: Rect) => r.y1 - r.y0;
export const cx = (r: Rect) => (r.x0 + r.x1) / 2;
export const cy = (r: Rect) => (r.y0 + r.y1) / 2;

/* ---------------------------------------------------------------- window */

export const WINDOW: Rect = { x0: 13, y0: 5.5, x1: 1266.5, y1: 711 };
export const TITLE_CARD: Rect = { x0: 30, y0: 13, x1: 1249, y1: 55.5 };

export const LIGHTS = [
  { cx: 44, fill: "#e14654" },
  { cx: 60.2, fill: "#e8c854" },
  { cx: 76.7, fill: "#82cd82" },
];
export const LIGHT_CY = 35;
export const LIGHT_D = 10;

export const FILM_ICON: Rect = { x0: 95, y0: 26, x1: 113, y1: 43 };
export const FILENAME_X = 124;
export const FILENAME_BASELINE = 42;
export const TIMECODE_PILL: Rect = { x0: 566, y0: 18, x1: 713, y1: 49 };
export const AUTOSAVE_X = 730;
export const PILL_1080: Rect = { x0: 992, y0: 21, x1: 1053, y1: 46 };
export const ACTION_BTN: Rect = { x0: 1063, y0: 17, x1: 1240, y1: 51 };
export const DIVIDER_Y = 397.5;

/* ------------------------------------------------------------ left panel */

export const LEFT_PANEL: Rect = { x0: 24.5, y0: 73, x1: 281, y1: 380 };
export const TABS_Y: [number, number] = [78.5, 105];
export const TABS = [
  { label: "素材", x0: 37.3, x1: 116.9 },
  { label: "转场", x0: 118.6, x1: 177.4 },
  { label: "文字", x0: 197.2, x1: 262.4 },
];

export const ASSET_CARDS = [
  { name: "夜景.mp4", dur: "2.4s", art: "night", rect: { x0: 37.5, y0: 112.6, x1: 150.9, y1: 192.1 } },
  { name: "拉面.mp4", dur: "4.6s", art: "ramen", rect: { x0: 158.4, y0: 112.6, x1: 266.2, y1: 192.1 } },
  { name: "柴犬.mov", dur: "2.4s", art: "corgi", rect: { x0: 37.5, y0: 205.2, x1: 150.9, y1: 267.5 } },
  { name: "小克蹦迪.mp4", dur: "2.8s", art: "disco", rect: { x0: 158.4, y0: 205.2, x1: 266.2, y1: 267.5 } },
] as const;

export const IMPORT_SLOTS: Rect[] = [
  { x0: 37.5, y0: 299.7, x1: 150.9, y1: 357.7 },
  { x0: 158.4, y0: 299.7, x1: 266.2, y1: 357.7 },
];

export const TRANS_TILES = [
  { label: "旋转", fill: "#e4e2f5", rect: { x0: 43, y0: 111.9, x1: 150.4, y1: 178.3 } },
  { label: "翻页", fill: "#cff0e4", rect: { x0: 159.9, y0: 111.9, x1: 264.1, y1: 178.3 } },
  { label: "故障", fill: "#fbdde7", rect: { x0: 43, y0: 203.4, x1: 150.4, y1: 268.1 } },
  { label: "缩放", fill: "#cfe4f7", rect: { x0: 159.9, y0: 203.4, x1: 264.1, y1: 268.1 } },
  { label: "滑动", fill: "#fbEDC6".toLowerCase(), rect: { x0: 43, y0: 291.3, x1: 150.4, y1: 357.6 } },
  { label: "溶解", fill: "#ede9e0", rect: { x0: 159.9, y0: 291.3, x1: 264.1, y1: 357.6 } },
];

export const TEXT_PRESETS = [
  { kind: "gaoneng", rect: { x0: 43, y0: 116.5, x1: 268, y1: 197.2 } },
  { kind: "haoye", rect: { x0: 43, y0: 204.7, x1: 268, y1: 285.2 } },
  { kind: "neon", rect: { x0: 43, y0: 294.2, x1: 268, y1: 373.9 } },
];

/* ----------------------------------------------------------- right panel */

export const RIGHT_PANEL: Rect = { x0: 1009, y0: 68.6, x1: 1260, y1: 369 };
export const ADJ_TITLE = { x: 1042, y: 80 };
export const ADJ_HAIRLINE = { y: 99.3, x0: 1042, x1: 1244 };
export const ADJ_ROWS = [
  { label: "闪光", cy: 159, min: 0, max: 100, tmin: 0, tmax: 100, from: 0, to: 70 },
  { label: "饱和度", cy: 219, min: 0, max: 250, tmin: 0, tmax: 250, from: 100, to: 110 },
  { label: "缩放冲击", cy: 279, min: 0, max: 60, tmin: 0, tmax: 100, from: 0, to: 60 },
  { label: "速度", cy: 339, min: 0.5, max: 2, tmin: 0, tmax: 2, from: 1.0, to: 1.0 },
];
export const ADJ_TRACK: { x0: number; x1: number; h: number } = { x0: 1020, x1: 1244, h: 14 };
export const ADJ_VALUE_X = 1244;

/* ---------------------------------------------------------------- phone */

export const PHONE_BODY: Rect = { x0: 533, y0: 39, x1: 748, y1: 376 };
export const PHONE_SCREEN: Rect = { x0: 545, y0: 53, x1: 736, y1: 374 };
export const PHONE_CX = 640.5;
export const PHONE_CY = 207.5;
export const NOTCH: Rect = { x0: 640.5 - 20, y0: 60, x1: 640.5 + 20, y1: 67 };
export const TRANSPORT_Y = 380;
export const TRANSPORT_X = [611, 646, 680];

/** hero growth (SPEC §6.5) */
export const PHONE_HERO = { w: 310, h: 465, cx: 605, cy: 362 };

/* ------------------------------------------------------------- timeline */

export const RULER_LABEL_Y = 410;
export const RULER_RULE_Y = 417.5;
export const TL_X0 = 100; // 0 s
export const PX_PER_SEC = 70.7;

export const RAIL: Rect = { x0: 38, y0: 0, x1: 72, y1: 0 };
export const RAIL_TOPS = [451, 500, 549];
export const RAIL_SIZE = 34;

export const TEXT_CLIP: Rect = { x0: 454, y0: 450, x1: 637, y1: 473 };
export const VIDEO_BAND: Rect = { x0: 13, y0: 480, x1: 1266.5, y1: 556 };
export const CLIP_Y: [number, number] = [487, 556];

export type ClipDef = {
  id: string;
  name: string | null;
  x0: number;
  x1: number;
  art: "night" | "ramen" | "corgi" | "disco";
  badge?: boolean;
  enterAt: number; // seconds
};
export const CLIP_CARDS: ClipDef[] = [
  { id: "c1", name: "夜景.mp4", x0: 100, x1: 275, art: "night", badge: true, enterAt: 2.6 },
  { id: "c2", name: "拉面.mp4", x0: 279, x1: 404, art: "ramen", badge: true, enterAt: 2.67 },
  { id: "c3", name: null, x0: 408, x1: 455, art: "ramen", enterAt: 2.74 },
  { id: "c4", name: "柴犬.mov", x0: 459, x1: 630, art: "corgi", badge: true, enterAt: 2.81 },
  { id: "c5", name: "小克蹦迪.mp4", x0: 637, x1: 848, art: "disco", badge: true, enterAt: 2.88 },
];
export const TRANSITION_BADGES = [277, 406, 457, 634];

export const AUDIO_BAR: Rect = { x0: 100, y0: 566, x1: 1140, y1: 606 };
export const KADIAN_BTN: Rect = { x0: 1147, y0: 569, x1: 1270, y1: 600 };
export const BEAT_TRI_Y: [number, number] = [609, 627];
export const BEAT_PITCH = 38.2;

export const PLAYHEAD_Y: [number, number] = [402, 700];
export const ZOOM_SLIDER = { x0: 11, x1: 113, y: 665, knob: 8 };
export const CAPTION = { x: 1250, y: 680 };

/* --------------------------------------------------------------- helpers */

export const secToX = (sec: number) => TL_X0 + sec * PX_PER_SEC;
