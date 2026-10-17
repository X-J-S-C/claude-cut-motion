import React from "react";
import { useCurrentFrame } from "remotion";
import { FONT_HAND, FONT_UI, INK } from "../theme";

const CARD = { x: 312, y: 247, w: 655, h: 201 };

type Tok = { text: string; color: string; italic?: boolean; bold?: boolean };

/** Line 1 is the string the SPEC pins down; 2–3 mirror the reference card. */
const LINES: Tok[][] = [
  [
    { text: "const ", color: "#6c63c8", italic: true, bold: true },
    { text: "剪辑软件", color: "#2e8c7a", bold: true },
    { text: " = ", color: "#2a2420" },
    { text: "小克", color: "#cf5b45", bold: true },
    { text: ".写代码", color: "#cf5b45" },
    { text: "()", color: "#2a2420" },
  ],
  [
    { text: "剪辑软件", color: "#2e8c7a", bold: true },
    { text: ".画出", color: "#2a2420" },
    { text: "(", color: "#6c63c8" },
    { text: "时间轴", color: "#c9a13e" },
    { text: ", ", color: "#2a2420" },
    { text: "预览", color: "#c9a13e" },
    { text: ", ", color: "#2a2420" },
    { text: "面板", color: "#c9a13e" },
    { text: ")", color: "#6c63c8" },
  ],
  [
    { text: "小克", color: "#cf5b45", bold: true },
    { text: ".钻进去", color: "#2a2420" },
    { text: "()", color: "#2a2420" },
  ],
];

const totalChars = (toks: Tok[]) => toks.reduce((n, t) => n + t.text.length, 0);

const Typed: React.FC<{ toks: Tok[]; n: number }> = ({ toks, n }) => {
  let left = n;
  return (
    <>
      {toks.map((t, i) => {
        if (left <= 0) return null;
        const take = Math.min(left, t.text.length);
        left -= take;
        return (
          <span key={i} style={{ color: t.color, fontStyle: t.italic ? "italic" : "normal", fontWeight: t.bold ? 700 : 500 }}>
            {t.text.slice(0, take)}
          </span>
        );
      })}
    </>
  );
};

/**
 * Cold-open code card (SPEC B01–B03): types `const 剪辑软件 = 小克.写代码()`,
 * tilts 2°, then slides up-left and fades as the app window assembles.
 */
export const CodeCard: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  if (t > 1.02) return null;

  const typing = (from: number, to: number, count: number) =>
    Math.round(count * Math.min(1, Math.max(0, (t - from) / (to - from))));
  const n1 = typing(0, 0.3, totalChars(LINES[0]));
  const n2 = typing(0.15, 0.45, totalChars(LINES[1]));
  const n3 = typing(0.3, 0.6, totalChars(LINES[2]));

  const tilt = t < 0.35 ? 0 : 2 * Math.min(1, (t - 0.35) / 0.2);
  const exit = Math.min(1, Math.max(0, (t - 0.7) / 0.3));
  const dx = -220 * exit;
  const dy = -140 * exit;
  const opacity = 1 - exit;

  const cursorOn = Math.floor(frame / 6) % 2 === 0;

  return (
    <div
      style={{
        position: "absolute",
        left: CARD.x,
        top: CARD.y,
        width: CARD.w,
        height: CARD.h,
        transform: `translate(${dx}px, ${dy}px) rotate(${tilt}deg)`,
        opacity,
        borderRadius: 10,
        background: "#fdfcf7",
        border: "2.4px solid #1f1a14",
        boxShadow: "3px 5px 0 rgba(31,26,20,0.14)",
        overflow: "hidden",
      }}
    >
      {/* mini title strip */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: CARD.w,
          height: 32,
          background: "#f4f0e8",
          borderBottom: "1.6px solid #d9d2c2",
        }}
      >
        {["#e14654", "#e8c854", "#82cd82"].map((c, i) => (
          <div
            key={c}
            style={{
              position: "absolute",
              left: 12 + i * 13,
              top: 11,
              width: 9,
              height: 9,
              borderRadius: 6,
              background: c,
              border: "1.3px solid #1f1a14",
              boxSizing: "border-box",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 8,
            width: CARD.w,
            textAlign: "center",
            fontFamily: FONT_UI,
            fontSize: 12,
            fontWeight: 500,
            color: "#6b655c",
          }}
        >
          小克.js — 终端
        </div>
      </div>

      {/* code lines */}
      {[0, 1, 2].map((i) => {
        const counts = [n1, n2, n3];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              top: 44 + i * 46,
              width: CARD.w,
              height: 40,
              fontFamily: FONT_HAND,
              fontSize: 22,
              lineHeight: "30px",
            }}
          >
            <span style={{ position: "absolute", left: 26, width: 18, textAlign: "right", color: "#b6ae9d", fontSize: 15 }}>
              {i + 1}
            </span>
            <span style={{ position: "absolute", left: 56, whiteSpace: "pre" }}>
              <Typed toks={LINES[i]} n={counts[i]} />
              {i === 0 && cursorOn && t < 0.42 && (
                <span
                  style={{
                    display: "inline-block",
                    width: 9,
                    height: 20,
                    background: "#cf5b45",
                    transform: "translateY(3px)",
                    marginLeft: 1,
                  }}
                />
              )}
            </span>
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 0, top: 0, width: 0, height: 0, color: INK }} />
    </div>
  );
};
