import React from "react";
import { useCurrentFrame } from "remotion";
import { FPS } from "../beats";
import { popScale, prog, rnd } from "../anim";
import { FONT_DISPLAY, FONT_HAND, FONT_UI, INK, PLUM } from "../theme";
import { Abs } from "./box";

const f = (s: number) => Math.round(s * FPS);

/** Entrances are scale .4 → 1.15 → 1 in 180 ms, exits a 120 ms fade. */
const popAt = (frame: number, tIn: number, tOut: number) => {
  const inK = popScale(frame, FPS, f(tIn));
  const outK = tOut >= 30 ? 1 : 1 - prog(frame, f(tOut - 0.12), f(tOut));
  const visible = frame >= f(tIn) && (tOut >= 30 || frame <= f(tOut));
  return { scale: 0.4 + 0.6 * Math.min(1.18, inK), opacity: visible ? Math.min(1, inK * 1.6) * outK : 0, visible };
};

const Sticker: React.FC<{
  tIn: number;
  tOut: number;
  cx: number;
  cy: number;
  rotate?: number;
  children: React.ReactNode;
}> = ({ tIn, tOut, cx, cy, rotate = 0, children }) => {
  const frame = useCurrentFrame();
  const p = popAt(frame, tIn, tOut);
  if (!p.visible) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: cx,
        top: cy,
        transform: `translate(-50%, -50%) rotate(${rotate}deg) scale(${p.scale})`,
        opacity: Math.max(0, Math.min(1, p.opacity)),
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );
};

/** Hand-lettered CJK headline with an ink outline. */
const Brush: React.FC<{
  size: number;
  color: string;
  strokeColor?: string;
  strokeW?: number;
  font?: string;
  shadow?: string;
  children: React.ReactNode;
}> = ({ size, color, strokeColor = INK, strokeW = 3, font = FONT_DISPLAY, shadow, children }) => (
  <span
    style={{
      fontFamily: font,
      fontSize: size,
      fontWeight: 700,
      color,
      WebkitTextStroke: `${strokeW}px ${strokeColor}`,
      paintOrder: "stroke fill",
      lineHeight: 1.1,
      textShadow: shadow,
    }}
  >
    {children}
  </span>
);

/** All 22 annotation events from SPEC §7. */
export const Stickers: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 50 }}>
      {/* opening callout: a thin leader line from the 导出 button into empty canvas
          (visible in the reference at t=1.00, before the mascot walks in) */}
      {t >= 0.9 && t <= 1.75 && (
        <svg
          width={1280}
          height={720}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            opacity: Math.min(1, (t - 0.9) / 0.15) * (1 - Math.max(0, (t - 1.6) / 0.15)),
          }}
        >
          <polyline
            points="1163,57 1004,57 1004,218"
            fill="none"
            stroke={INK}
            strokeWidth={1.7}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M998 218 h12" stroke={INK} strokeWidth={1.7} strokeLinecap="round" />
          <path d="M1160 53 l4 -5 l4 5 z" fill="#e8b44a" stroke={INK} strokeWidth="1" strokeLinejoin="round" />
        </svg>
      )}

      {/* S01 开工！speech bubble */}
      <Sticker tIn={1.9} tOut={3.4} cx={195} cy={356} rotate={3}>
        <div
          style={{
            position: "relative",
            padding: "8px 16px 10px",
            background: "#fdfbf4",
            border: `2.5px solid ${INK}`,
            borderRadius: 16,
            fontFamily: FONT_DISPLAY,
            fontSize: 26,
            fontWeight: 700,
            color: INK,
          }}
        >
          开工！
          <div
            style={{
              position: "absolute",
              right: 12,
              bottom: -10,
              width: 13,
              height: 13,
              background: "#fdfbf4",
              borderRight: `2.5px solid ${INK}`,
              borderBottom: `2.5px solid ${INK}`,
              transform: "rotate(45deg)",
            }}
          />
        </div>
      </Sticker>

      {/* S03 已在局部预览 */}
      <Sticker tIn={5.9} tOut={6.5} cx={255} cy={412}>
        <span style={{ fontFamily: FONT_UI, fontSize: 9, color: "#8c8478" }}>已在局部预览</span>
      </Sticker>

      {/* S04 啪! */}
      <Sticker tIn={6.4} tOut={7.1} cx={620} cy={130} rotate={-8}>
        <Brush size={34} color={INK} strokeColor="#ffffff" strokeW={4}>
          啪!
        </Brush>
      </Sticker>

      {/* S05 清爽! */}
      <Sticker tIn={7.5} tOut={8.3} cx={530} cy={368} rotate={-5}>
        <div
          style={{
            padding: "4px 14px 6px",
            background: "#fdfbf4",
            border: `2.2px solid ${INK}`,
            borderRadius: 10,
            fontFamily: FONT_DISPLAY,
            fontSize: 26,
            fontWeight: 700,
            color: INK,
          }}
        >
          清爽!
        </div>
      </Sticker>

      {/* S06 踩坑 stamp */}
      <Sticker tIn={8.4} tOut={9.2} cx={524} cy={558} rotate={-12}>
        <div
          style={{
            padding: "3px 12px 5px",
            border: "3px solid #6b5a3a",
            borderRadius: 4,
            color: "#6b5a3a",
            fontFamily: FONT_DISPLAY,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 2,
            opacity: 0.4,
            outline: "1.5px solid #6b5a3a",
            outlineOffset: 2,
          }}
        >
          踩坑
        </div>
      </Sticker>

      {/* S07 空心入网! handwriting */}
      <Sticker tIn={9.5} tOut={10.5} cx={450} cy={330} rotate={-4}>
        <Brush size={36} color="#2f7f7a" strokeColor="#ffffff" strokeW={3}>
          空心入网!
        </Brush>
      </Sticker>

      {/* S08 Ctrl+Z keycap */}
      <Sticker tIn={12.95} tOut={14.05} cx={318} cy={452} rotate={-3}>
        <div
          style={{
            padding: "8px 16px 11px",
            background: "#fdfbf4",
            border: `2.6px solid ${INK}`,
            borderRadius: 12,
            boxShadow: `0 6px 0 ${INK}, 0 9px 0 rgba(31,26,20,0.18)`,
            fontFamily: FONT_HAND,
            fontSize: 26,
            fontWeight: 600,
            color: INK,
          }}
        >
          Ctrl+Z
        </div>
      </Sticker>

      {/* S09 已修正 stamp */}
      <Sticker tIn={13.15} tOut={14.05} cx={392} cy={404} rotate={-10}>
        <div
          style={{
            padding: "4px 14px 6px",
            border: "3px solid #3e8e5a",
            borderRadius: 5,
            color: "#3e8e5a",
            fontFamily: FONT_DISPLAY,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 3,
            outline: "1.5px dashed #3e8e5a",
            outlineOffset: 3,
            opacity: 0.92,
          }}
        >
          已修正
        </div>
      </Sticker>

      {/* S10 撤销! */}
      <Sticker tIn={13.55} tOut={14.1} cx={806} cy={398} rotate={-6}>
        <Brush size={30} color="#3e8e5a" strokeColor="#ffffff" strokeW={3}>
          撤销!
        </Brush>
      </Sticker>

      {/* S11 饱和度拉满 */}
      <Sticker tIn={16.8} tOut={18.1} cx={880} cy={45} rotate={-7}>
        <Brush size={34} color="#e14654" strokeColor="#ffffff" strokeW={3}>
          饱和度:拉满
        </Brush>
      </Sticker>

      {/* S12 极限!! (blinks) */}
      {t >= 17.0 && t <= 19.4 && (
        <div
          style={{
            position: "absolute",
            left: 1180,
            top: 258,
            opacity: Math.floor((t - 17.0) / 0.3) % 2 === 0 ? 1 : 0.25,
            fontFamily: FONT_UI,
            fontSize: 14,
            fontWeight: 700,
            color: "#e14654",
            transform: "rotate(-5deg)",
          }}
        >
          极限!!
        </div>
      )}

      {/* S13 …太亮了 */}
      <Sticker tIn={17.8} tOut={18.7} cx={185} cy={563} rotate={-3}>
        <div
          style={{
            padding: "3px 12px 5px",
            background: "#fdfbf4",
            border: `2px solid ${INK}`,
            borderRadius: 12,
            fontFamily: FONT_UI,
            fontSize: 18,
            fontWeight: 600,
            color: INK,
          }}
        >
          ……太亮了
        </div>
      </Sticker>

      {/* S14 低! */}
      <Sticker tIn={19.3} tOut={19.9} cx={190} cy={507} rotate={-6}>
        <Brush size={26} color={INK} strokeColor="#ffffff" strokeW={3}>
          低!
        </Brush>
      </Sticker>

      {/* S15 卡点 */}
      <Sticker tIn={20.6} tOut={21.6} cx={92} cy={558} rotate={-4}>
        <div
          style={{
            padding: "2px 10px 4px",
            background: "#8fd6cb",
            border: `2px solid ${INK}`,
            borderRadius: 6,
            fontFamily: FONT_DISPLAY,
            fontSize: 22,
            fontWeight: 700,
            color: INK,
          }}
        >
          卡点!
        </div>
      </Sticker>

      {/* S16 BONK! — big, gold, ink outline, over the right panel */}
      <Sticker tIn={25.3} tOut={26.2} cx={1000} cy={310} rotate={-9}>
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 14,
              top: 18,
              width: 320,
              height: 120,
              background: "rgba(90,80,70,0.22)",
              filter: "blur(8px)",
              borderRadius: 40,
            }}
          />
          <span
            style={{
              position: "relative",
              fontFamily: FONT_HAND,
              fontSize: 96,
              fontWeight: 900,
              color: "#d8a33c",
              WebkitTextStroke: `5px ${INK}`,
              paintOrder: "stroke fill",
              letterSpacing: 2,
            }}
          >
            BONK!
          </span>
        </div>
      </Sticker>

      {/* S17 啦! */}
      <Sticker tIn={25.9} tOut={26.5} cx={890} cy={430} rotate={4}>
        <Brush size={30} color={INK} strokeColor="#ffffff" strokeW={4}>
          啦!
        </Brush>
      </Sticker>

      {/* S18 叮! */}
      <Sticker tIn={26.3} tOut={27.0} cx={1060} cy={167} rotate={5}>
        <Brush size={34} color={PLUM} strokeColor="#ffffff" strokeW={3}>
          叮!
        </Brush>
      </Sticker>

      {/* S19 sticky note */}
      <NoteCard frame={frame} />

      {/* S20 拿捏了! over the phone screen */}
      <Sticker tIn={28.4} tOut={30.0} cx={617} cy={290} rotate={-4}>
        <Brush size={44} color="#f5d24e" strokeColor={INK} strokeW={4}>
          拿捏了!
        </Brush>
      </Sticker>

      {/* S22 handled inside PhonePreview (caption on the screen) */}
    </div>
  );
};

/** Ruled sticky note that types itself during the finale. */
const NoteCard: React.FC<{ frame: number }> = ({ frame }) => {
  const t = frame / 30;
  if (t < 27.1) return null;
  const enter = popScale(frame, FPS, f(27.1));
  const slide = (1 - Math.min(1, enter)) * 60;
  const line1 = "30 秒剪完,";
  const line2 = "Opus 5.5";
  const n1 = Math.round(line1.length * prog(frame, f(28.0), f(28.5)));
  const n2 = Math.round(line2.length * prog(frame, f(28.5), f(29.1)));
  const underlineK = prog(frame, f(29.0), f(29.2));
  const line3 = prog(frame, f(29.3), f(29.6));

  return (
    <div
      style={{
        position: "absolute",
        left: 50,
        top: 168,
        width: 360,
        height: 312,
        transform: `rotate(-1.5deg) translateY(${slide}px)`,
        opacity: Math.min(1, enter * 1.4),
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#fffdf8",
          border: `2.6px solid ${INK}`,
          borderRadius: 6,
          boxShadow: "5px 7px 0 rgba(31,26,20,0.16)",
        }}
      />
      {/* ruled lines */}
      <svg width="360" height="312" style={{ position: "absolute", left: 0, top: 0 }}>
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1={12} y1={26 + i * 24} x2={348} y2={26 + i * 24} stroke="#d9dde7" strokeWidth="1" />
        ))}
        <line x1={30} y1={0} x2={30} y2={312} stroke="#e3b7b0" strokeWidth="2" opacity="0.5" />
      </svg>
      {/* yellow washi tape */}
      <div
        style={{
          position: "absolute",
          left: 113,
          top: -13,
          width: 120,
          height: 25,
          background: "#f2d06a",
          border: "1.4px solid #c8a63f",
          opacity: 0.92,
          transform: "rotate(-2deg)",
        }}
      />
      <div style={{ position: "absolute", left: 44, top: 28, fontFamily: FONT_HAND, fontSize: 30, fontWeight: 500, color: INK, whiteSpace: "nowrap" }}>
        {line1.slice(0, n1)}
      </div>
      <div style={{ position: "absolute", left: 42, top: 90, fontFamily: FONT_HAND, fontSize: 46, fontWeight: 600, color: INK, whiteSpace: "nowrap" }}>
        {line2.slice(0, n2)}
      </div>
      <div
        style={{
          position: "absolute",
          left: 46,
          top: 152,
          width: 200 * underlineK,
          height: 3,
          background: "#e14654",
          borderRadius: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 44,
          top: 240,
          fontFamily: FONT_HAND,
          fontSize: 22,
          fontWeight: 500,
          color: INK,
          opacity: line3,
          whiteSpace: "nowrap",
        }}
      >
        — 小克 收工 ✨
      </div>
    </div>
  );
};

/** deterministic confetti used by the ending */
export const Confetti: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  if (t < 26.8) return null;
  return (
    <>
      {[...Array(18)].map((_, i) => {
        const sx = rnd(i * 3 + 1);
        const sy = rnd(i * 7 + 5);
        return (
          <Abs
            key={`cf${i}`}
            x={40 + sx * 1180}
            y={40 + ((sy * 520 + (t - 26.8) * 26) % 600)}
            w={6 + sy * 6}
            h={3 + sx * 5}
            fill={["#f2d06a", "#8fe3da", "#e8708b", "#fdfbf4", "#a58bd4"][i % 5]}
            style={{
              opacity: 0.9 * Math.min(1, (t - 26.8) / 0.8),
              transform: `rotate(${frame * 4 + i * 33}deg)`,
            }}
          />
        );
      })}
    </>
  );
};
