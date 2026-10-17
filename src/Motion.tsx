import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { appOpacity, DESIGN_HEIGHT, DESIGN_WIDTH, FPS } from "./beats";
import { WINDOW } from "./layout";
import { popScale, prog } from "./anim";
import { CANVAS, INK, PAPER } from "./theme";
import { AdjustPanel } from "./ui/AdjustPanel";
import { Camera } from "./ui/Camera";
import { CodeCard } from "./ui/CodeCard";
import { LeftPanel } from "./ui/LeftPanel";
import { MascotStage, PointerArmLayer } from "./ui/MascotStage";
import { PhonePreview } from "./ui/PhonePreview";
import { Confetti, Stickers } from "./ui/Stickers";
import { Timeline } from "./ui/Timeline";
import { TitleBar } from "./ui/TitleBar";

const f = (s: number) => Math.round(s * FPS);

/** Staggered pop-in used while the app window assembles itself (B02–B04). */
const entrance = (frame: number, tIn: number) => {
  const k = popScale(frame, FPS, f(tIn));
  const o = Math.min(1, Math.max(0, (frame - f(tIn)) / 5));
  return {
    opacity: o,
    transform: `scale(${0.92 + 0.08 * Math.min(1.04, Math.max(0, k))})`,
    transformOrigin: "center center",
  } as React.CSSProperties;
};

/**
 * ClaudeCutMotion — a 30 s hand-drawn mock of a Chinese desktop video editor.
 *
 * Layer order (bottom → top):
 *   paper → [camera] → app window (title bar / left panel / 调整 / timeline)
 *         → centre phone (own size animation) → mascot + pointer arm
 *         → code card (cold open) → stickers/annotations → confetti
 * The app group fades to 22 % for the hero ending while the phone stays crisp.
 */
export const Motion: React.FC = () => {
  const frame = useCurrentFrame();
  const appK = appOpacity(frame);
  // the window border draws itself on behind the code card (B02)
  const shellK = prog(frame, f(0.35), f(0.66));

  return (
    <AbsoluteFill style={{ background: PAPER, overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: "scale(1.5)", transformOrigin: "0 0", width: DESIGN_WIDTH, height: DESIGN_HEIGHT }}>
        <Camera>
          {/* paper */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: DESIGN_WIDTH,
              height: DESIGN_HEIGHT,
              background: PAPER,
            }}
          />

          {/* ---------------- app window (fades for the ending) ---------------- */}
          <div style={{ position: "absolute", inset: 0, opacity: appK * shellK }}>
            {/* window body */}
            <div
              style={{
                position: "absolute",
                left: WINDOW.x0,
                top: WINDOW.y0,
                width: WINDOW.x1 - WINDOW.x0,
                height: WINDOW.y1 - WINDOW.y0,
                borderRadius: 12,
                background: CANVAS,
                border: `3px solid ${INK}`,
                boxSizing: "border-box",
                overflow: "hidden",
                transform: `scale(${0.985 + 0.015 * shellK})`,
                transformOrigin: "center center",
              }}
            >
              {/* preview area wash */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 52.5,
                  width: "100%",
                  height: 340,
                  background: "#f4efe6",
                  opacity: 0.55,
                }}
              />
              {/* children are authored in canvas coords: shift back by the window origin */}
              <div style={{ position: "absolute", left: -WINDOW.x0, top: -WINDOW.y0, width: DESIGN_WIDTH, height: DESIGN_HEIGHT }}>
                <div style={{ position: "absolute", inset: 0, ...entrance(frame, 0.76) }}>
                  <LeftPanel />
                </div>
                <div style={{ position: "absolute", inset: 0, ...entrance(frame, 1.25) }}>
                  <AdjustPanel />
                </div>
                <div style={{ position: "absolute", inset: 0, ...entrance(frame, 1.4) }}>
                  <Timeline />
                </div>
              </div>
            </div>
            {/* window drop shadow */}
            <div
              style={{
                position: "absolute",
                left: 16,
                top: 714,
                width: 1248,
                height: 4,
                borderRadius: 3,
                background: "rgba(31,26,20,0.18)",
              }}
            />
          </div>

          {/* ---------------- centre phone (own size animation) ---------------- */}
          <div style={{ position: "absolute", inset: 0, ...entrance(frame, 0.7) }}>
            <PhonePreview />
          </div>

          {/* ---------------- title bar, above the phone ---------------- */}
          <div style={{ position: "absolute", inset: 0, opacity: appK * shellK }}>
            <div style={{ position: "absolute", inset: 0, ...entrance(frame, 0.7) }}>
              <TitleBar />
            </div>
          </div>

          {/* ---------------- mascot + pointer arm ---------------- */}
          <PointerArmLayer />
          <MascotStage />

          {/* ---------------- cold open code card ---------------- */}
          <CodeCard />

          {/* ---------------- annotations ---------------- */}
          <Stickers />
          <Confetti />
        </Camera>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
