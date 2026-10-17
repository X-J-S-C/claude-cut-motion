import React from "react";
import { useCurrentFrame } from "remotion";
import { CAMERA, DESIGN_HEIGHT, DESIGN_WIDTH, FPS } from "../beats";
import { easeInOut, lerp, prog } from "../anim";

export type Cam = { s: number; fx: number; fy: number };

/** Camera pose at a frame: screen = (canvas - F) * s + (640, 360). */
export const camAt = (frame: number): Cam => {
  const t = frame / FPS;
  if (t <= CAMERA[0].t) return { s: CAMERA[0].s, fx: CAMERA[0].fx, fy: CAMERA[0].fy };
  for (let i = 1; i < CAMERA.length; i++) {
    const a = CAMERA[i - 1];
    const b = CAMERA[i];
    if (t <= b.t) {
      const k = easeInOut(prog(t, a.t, b.t));
      return { s: lerp(a.s, b.s, k), fx: lerp(a.fx, b.fx, k), fy: lerp(a.fy, b.fy, k) };
    }
  }
  const last = CAMERA[CAMERA.length - 1];
  return { s: last.s, fx: last.fx, fy: last.fy };
};

export const Camera: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const { s, fx, fy } = camAt(frame);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: DESIGN_WIDTH,
        height: DESIGN_HEIGHT,
        transform: `translate(${640 - fx * s}px, ${360 - fy * s}px) scale(${s})`,
        transformOrigin: "0 0",
      }}
    >
      {children}
    </div>
  );
};
