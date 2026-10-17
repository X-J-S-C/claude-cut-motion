/**
 * Deterministic animation helpers. Every value in the composition is a pure
 * function of the current frame — no timers, no CSS transitions, no randomness
 * that is not seeded.
 */
import { Easing, interpolate, spring } from "remotion";

export const clamp = (v: number, lo = 0, hi = 1) =>
  Math.min(hi, Math.max(lo, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** 0..1 progress of `frame` inside [from, to] (clamped). */
export const prog = (frame: number, from: number, to: number) =>
  to === from ? (frame >= to ? 1 : 0) : clamp((frame - from) / (to - from));

export const easeInOut = Easing.bezier(0.42, 0, 0.35, 1);
export const easeOut = Easing.bezier(0.16, 0.84, 0.24, 1);
export const easeIn = Easing.bezier(0.55, 0, 0.9, 0.4);
export const easeOutBack = Easing.bezier(0.18, 1.28, 0.4, 1);

/** Interpolate one segment with easing. */
export const seg = (
  frame: number,
  from: number,
  to: number,
  a: number,
  b: number,
  easing: (t: number) => number = easeInOut,
) => lerp(a, b, easing(prog(frame, from, to)));

/** Piecewise linear-with-easing keyframe track. Keys must be ascending. */
export const track = (
  frame: number,
  keys: ReadonlyArray<readonly [number, number]>,
  easing: (t: number) => number = easeInOut,
) => {
  if (frame <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    if (frame <= keys[i][0]) {
      const [f0, v0] = keys[i - 1];
      const [f1, v1] = keys[i];
      return lerp(v0, v1, easing(prog(frame, f0, f1)));
    }
  }
  return keys[keys.length - 1][1];
};

/** Step track: jumps at each key boundary (used for discrete UI states). */
export const stepTrack = (
  frame: number,
  keys: ReadonlyArray<readonly [number, string]>,
) => {
  let out = keys[0][1];
  for (const [f, v] of keys) if (frame >= f) out = v;
  return out;
};

/** Damped spring on a 0..1 scale, driven by frame (never by wall clock). */
export const springIn = (
  frame: number,
  fps: number,
  start: number,
  config: { damping?: number; stiffness?: number; mass?: number } = {},
) =>
  spring({
    frame: frame - start,
    fps,
    config: { damping: 12, stiffness: 180, mass: 0.7, ...config },
  });

/** Pop-in scale that overshoots slightly, then settles. */
export const popScale = (frame: number, fps: number, start: number) =>
  springIn(frame, fps, start, { damping: 9, stiffness: 220, mass: 0.6 });

/** Repeating bob, but purely frame derived. */
export const bob = (frame: number, period: number, amp: number) =>
  Math.sin((frame / period) * Math.PI * 2) * amp;

/** Quantised "on twos" step so hand-drawn wobble feels like drawn frames. */
export const onTwos = (frame: number) => Math.floor(frame / 2) * 2;

/** Deterministic pseudo random in [0,1) from an integer seed. */
export const rnd = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
  return x - Math.floor(x);
};

/** Opacity helper: fade in during [a,b], hold, fade out during [c,d]. */
export const fadeWindow = (
  frame: number,
  a: number,
  b: number,
  c: number,
  d: number,
) => Math.min(prog(frame, a, b), 1 - prog(frame, c, d));

export { interpolate, spring };
