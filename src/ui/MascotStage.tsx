import React from "react";
import { useCurrentFrame } from "remotion";
import { FPS } from "../beats";
import { lerp, popScale, prog, track } from "../anim";
import { Mascot, PointerArm } from "./Mascot";

const f = (s: number) => Math.round(s * FPS);

/** Body centre in canvas px (SPEC §6.2). Interpolated between the rows. */
const POS: ReadonlyArray<readonly [number, number, number]> = [
  [f(1.55), 205, 300],
  [f(1.9), 240, 300],
  [f(2.4), 250, 300],
  [f(3.2), 205, 435],
  [f(4.2), 205, 435],
  [f(5.1), 205, 470],
  [f(6.0), 320, 470],
  [f(6.9), 420, 460],
  [f(7.4), 330, 430],
  [f(8.3), 300, 430],
  [f(8.6), 215, 425],
  [f(10.2), 222, 426],
  [f(12.2), 230, 430],
  [f(13.6), 200, 430],
  [f(15.0), 250, 430],
  [f(16.2), 250, 430],
  [f(16.6), 555, 470],
  [f(19.6), 520, 500],
  [f(21.0), 545, 530],
  [f(22.4), 735, 530],
  [f(26.2), 735, 530],
  [f(27.0), 1030, 510],
  [f(30.0), 1030, 512],
];

/** Pointer targets: [from, to, x, y] in canvas px (SPEC §6.2). */
const TARGETS: ReadonlyArray<readonly [number, number, number, number]> = [
  [f(1.55), f(2.4), 94, 150],
  [f(2.4), f(3.2), 77, 92],
  [f(3.2), f(4.6), 94, 150],
  [f(4.6), f(5.1), 140, 330],
  [f(5.1), f(6.9), 620, 505],
  [f(6.9), f(8.3), 330, 520],
  [f(8.3), f(10.2), 264, 325],
  [f(10.2), f(12.2), 264, 325],
  [f(12.2), f(15.0), 155, 245],
  [f(15.0), f(16.2), 545, 462],
  [f(16.2), f(17.0), 1043, 159],
  [f(17.0), f(18.4), 1117, 219],
  [f(18.4), f(19.6), 1200, 279],
  [f(19.6), f(22.4), 1208, 585],
];

const xAt = (frame: number) => track(frame, POS.map(([fr, x]) => [fr, x] as const));
const yAt = (frame: number) =>
  track(
    frame,
    POS.map(([fr, , y]) => [fr, y] as const),
  );

const targetAt = (frame: number): { x: number; y: number } | null => {
  const row = TARGETS.find(([a, b]) => frame >= a && frame < b);
  if (!row) return null;
  return { x: row[2], y: row[3] };
};

const scaleAt = (frame: number) => {
  const t = frame / FPS;
  if (t >= 27.0) return 2.3;
  if (t >= 26.2) return lerp(1, 2.3, (t - 26.2) / 0.8);
  return 1;
};

/** Pose timeline: eyes / blush / sunglasses / walk phase. */
const poseAt = (frame: number) => {
  const t = frame / FPS;
  const walking =
    (t >= 1.55 && t <= 1.95) ||
    (t >= 5.1 && t <= 6.9) ||
    (t >= 12.2 && t <= 13.6) ||
    (t >= 19.6 && t <= 22.4);
  const happy = (t >= 13.9 && t <= 15.0) || t >= 23.2;
  return {
    eyes: happy ? ("closed" as const) : ("oval" as const),
    blush: t >= 22.4 || (t >= 13.9 && t <= 15.0),
    shadesDown: t >= 18.0 && t < 19.0,
    shades: t >= 22.4,
    walk: walking ? (t * 2.4) % 1 : 0,
    dip: walking ? Math.abs(Math.sin(t * Math.PI * 8)) * 2.5 : 0,
  };
};

export const MascotStage: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const visible = (t >= 1.5 && t <= 30) || false;
  if (!visible) return null;
  const x = xAt(frame);
  const y = yAt(frame);
  const s = scaleAt(frame);
  const p = poseAt(frame);
  const enter = popScale(frame, FPS, f(1.55));

  // hero hop at the render beat
  const hop = t >= 23.2 && t <= 26.2 ? Math.abs(Math.sin((t - 23.2) * Math.PI * 2)) * 9 : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: x - (82 * s) / 2,
        top: y - 30 * s - hop,
        width: 82 * s,
        height: 75 * s,
        transform: `scale(${Math.min(1.06, 0.75 + 0.25 * Math.min(1, enter))}) rotate(${Math.sin(frame / 13) * 1.2}deg)`,
        transformOrigin: "center bottom",
      }}
    >
      <Mascot
        size={82 * s}
        eyes={p.eyes}
        blush={p.blush}
        shades={p.shades}
        shadesDown={p.shadesDown}
        walk={p.walk}
        dip={p.dip}
      />
    </div>
  );
};

/** The long pointer arm, drawn in canvas space from the mascot's shoulder. */
export const PointerArmLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  if (t < 1.5) return null;
  const target = targetAt(frame);
  if (!target) return null;
  const s = scaleAt(frame);
  const x = xAt(frame);
  const y = yAt(frame);
  // shoulder: right edge of the body, slightly above its middle
  const sx = x + 41 * s;
  const sy = y - 30 * s - 8 * s;

  const dx = target.x - sx;
  const dy = target.y - sy;
  const len = Math.hypot(dx, dy) || 1;
  const clamped = Math.min(900, Math.max(20, len));
  const ex = sx + (dx / len) * clamped;
  const ey = sy + (dy / len) * clamped;

  return (
    <svg
      width={1280}
      height={720}
      style={{ position: "absolute", left: 0, top: 0, zIndex: 39, pointerEvents: "none" }}
    >
      <PointerArm x0={sx} y0={sy} x1={ex} y1={ey} />
    </svg>
  );
};

export const pointerDebug = { xAt, yAt, targetAt, prog };
