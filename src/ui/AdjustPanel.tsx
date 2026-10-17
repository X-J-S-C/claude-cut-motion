import React from "react";
import { useCurrentFrame } from "remotion";
import { rightPanelRect, sliderText, sliderValues } from "../beats";
import { ADJ_ROWS } from "../layout";
import { FONT_UI, INK, PANEL, SLIDER_GREY, SLIDER_TEAL } from "../theme";
import { Abs, Txt, wobble } from "./box";

const BORDER = 2.5;
/** Row geometry relative to the panel's content box (see the analysis spec §1.3). */
const ROW_TOP_OFFSET = 60; // 闪光 label top, canvas 129 - panel y0 68.6 ≈ 60
const ROW_PITCH = 60;
const TRACK_INSET_L = 11;
const TRACK_INSET_R = 16;
const LABEL_INSET = 33;
const TRACK_H = 14;

/** Right inspector: 调整 + four sliders. Width follows the beat (see rightPanelRect). */
export const AdjustPanel: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const vals = sliderValues(frame);
  const rect = rightPanelRect(frame);
  const w = rect.x1 - rect.x0;
  const h = rect.y1 - rect.y0;
  const keys = ["flash", "saturation", "punch", "speed"] as const;

  // content-box origin (canvas px of the panel's inner top-left)
  const cx0 = rect.x0 + BORDER;
  const cy0 = rect.y0 + BORDER;
  const trackL = TRACK_INSET_L;
  const trackW = Math.max(40, w - TRACK_INSET_L - TRACK_INSET_R - BORDER * 2);

  return (
    <Abs
      x={rect.x0}
      y={rect.y0}
      w={w}
      h={h}
      r={10}
      fill={PANEL}
      stroke={INK}
      sw={BORDER}
      style={{ boxShadow: "2px 3px 0 rgba(31,26,20,0.10)", overflow: "hidden" }}
    >
      {/* ---------------- 调整 ✦ title row ---------------- */}
      <Txt x={LABEL_INSET - BORDER} y={11.4} size={20} weight={600} color={INK} font={FONT_UI} mid>
        调整
      </Txt>
      <svg width="18" height="18" style={{ position: "absolute", left: LABEL_INSET - BORDER + 71, top: 2.4 }}>
        <path
          d="M9 0.5 l2.1 5.2 l5.4 0.6 l-4.1 3.6 l1.2 5.3 L9 12.4 L4.4 15.2 l1.2 -5.3 L1.5 6.3 l5.4 -0.6 z"
          fill="#e8b44a"
          stroke={INK}
          strokeWidth="1.3"
        />
      </svg>

      {/* hairline under the title */}
      <div
        style={{
          position: "absolute",
          left: LABEL_INSET - BORDER,
          top: 30.7,
          width: Math.max(20, w - (LABEL_INSET - BORDER) - 16),
          height: 1,
          background: "#d8d2c8",
        }}
      />

      {/* ---------------- four rows ---------------- */}
      {ADJ_ROWS.map((row, i) => {
        const key = keys[i];
        const v = vals[key];
        // knob position uses the *track* scale (饱和度 is neutral at 50 %, 速度 at 1.0x)
        const ratio = Math.max(0, Math.min(1, (v - row.tmin) / (row.tmax - row.tmin)));
        const labelTop = ROW_TOP_OFFSET + i * ROW_PITCH;
        const trackTop = labelTop + 32;
        const knobX = trackL + ratio * trackW;
        const maxed = key === "saturation" && t >= 17.0 && t < 19.0;
        return (
          <React.Fragment key={row.label}>
            <Txt
              x={LABEL_INSET - BORDER}
              y={labelTop}
              size={15}
              weight={400}
              color="#2a2420"
              font={FONT_UI}
            >
              {row.label}
            </Txt>
            <Txt
              x={w - 16 - BORDER - 86}
              y={labelTop}
              w={86}
              size={15}
              weight={t >= 18.0 && t < 19.0 ? 700 : 400}
              color={t >= 18.0 && t < 19.0 ? "#e14654" : "#2a2420"}
              align="right"
              font={FONT_UI}
            >
              {t >= 18.0 && t < 19.0 ? "爆表!!" : sliderText(key, v)}
            </Txt>
            <div
              style={{
                position: "absolute",
                left: trackL,
                top: trackTop,
                width: trackW,
                height: TRACK_H,
                borderRadius: TRACK_H / 2,
                background: SLIDER_GREY,
                border: `1.5px solid ${INK}`,
                boxSizing: "border-box",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: trackL,
                top: trackTop,
                width: Math.max(2, trackW * ratio),
                height: TRACK_H,
                borderRadius: TRACK_H / 2,
                background: maxed ? "#d9453a" : SLIDER_TEAL,
                border: `1.5px solid ${INK}`,
                boxSizing: "border-box",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: knobX - 10,
                top: trackTop + TRACK_H / 2 - 10,
                width: 20,
                height: 20,
                borderRadius: 12,
                background: "#ffffff",
                border: `2px solid ${maxed ? "#d9453a" : INK}`,
                boxSizing: "border-box",
                ...wobble(60 + i),
              }}
            />
          </React.Fragment>
        );
      })}
      <div style={{ position: "absolute", left: cx0 - rect.x0, top: cy0 - rect.y0, width: 0, height: 0 }} />
    </Abs>
  );
};
