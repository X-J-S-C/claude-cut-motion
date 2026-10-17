import React from "react";
import { useCurrentFrame } from "remotion";
import { buttonState, timecodeString } from "../beats";
import {
  ACTION_BTN,
  AUTOSAVE_X,
  FILENAME_X,
  FILM_ICON,
  LIGHTS,
  LIGHT_CY,
  LIGHT_D,
  PILL_1080,
  TIMECODE_PILL,
  TITLE_CARD,
} from "../layout";
import {
  CARD,
  FONT_UI,
  INK,
  META_GREY,
  PILL_BEIGE,
  RENDER_YELLOW,
  SUCCESS,
  TEAL_BTN,
} from "../theme";
import { Abs, Txt, wobble } from "./box";

/** Title bar card: traffic lights, film icon, filename, timecode, 1080p, action. */
export const TitleBar: React.FC = () => {
  const frame = useCurrentFrame();
  const state = buttonState(frame);

  const label =
    state === "export"
      ? "导出"
      : state === "rendering"
        ? "渲染中 99%"
        : state === "rendering999"
          ? "渲染中 99.999%"
          : "完成";

  const btnFill = state === "export" ? TEAL_BTN : state === "done" ? SUCCESS : RENDER_YELLOW;
  const pillH = PILL_1080.y1 - PILL_1080.y0;
  const tcW = TIMECODE_PILL.x1 - TIMECODE_PILL.x0;
  const tcH = TIMECODE_PILL.y1 - TIMECODE_PILL.y0;
  const btnW = ACTION_BTN.x1 - ACTION_BTN.x0;
  const btnH = ACTION_BTN.y1 - ACTION_BTN.y0;

  return (
    <>
      <Abs
        x={TITLE_CARD.x0}
        y={TITLE_CARD.y0}
        w={TITLE_CARD.x1 - TITLE_CARD.x0}
        h={TITLE_CARD.y1 - TITLE_CARD.y0}
        r={14}
        fill={CARD}
        stroke={INK}
        sw={2}
      />

      {LIGHTS.map((l, i) => (
        <Abs
          key={l.fill}
          x={l.cx - LIGHT_D / 2}
          y={LIGHT_CY - LIGHT_D / 2}
          w={LIGHT_D}
          h={LIGHT_D}
          r={LIGHT_D}
          fill={l.fill}
          stroke={INK}
          sw={1.5}
          style={wobble(3 + i)}
        />
      ))}

      {/* film / reel icon with sprocket ticks above it */}
      <Abs
        x={FILM_ICON.x0}
        y={FILM_ICON.y0}
        w={FILM_ICON.x1 - FILM_ICON.x0}
        h={FILM_ICON.y1 - FILM_ICON.y0}
        r={4}
        fill="#ce7059"
        stroke={INK}
        sw={2}
        style={wobble(7)}
      >
        <div style={{ position: "absolute", left: 0, top: 6.5, width: "100%", height: 1.4, background: INK }} />
        <div style={{ position: "absolute", left: 2, top: 9.5, width: 3, height: 4, background: CARD, borderRadius: 1 }} />
        <div style={{ position: "absolute", left: 7, top: 9.5, width: 3, height: 4, background: CARD, borderRadius: 1 }} />
        <div style={{ position: "absolute", left: 12, top: 9.5, width: 3, height: 4, background: CARD, borderRadius: 1 }} />
      </Abs>
      <svg width="24" height="7" style={{ position: "absolute", left: 92, top: 19.5 }}>
        <g stroke={INK} strokeWidth="1.6" strokeLinecap="round">
          <path d="M2 6.5 L5 1.5" />
          <path d="M9 6.5 L12 1.5" />
          <path d="M16 6.5 L19 1.5" />
        </g>
      </svg>

      <Txt x={FILENAME_X} y={28} size={17} weight={500} color={INK} font={FONT_UI}>
        小克剪辑_最终版_打死不改(3).mp4
      </Txt>

      {/* timecode pill */}
      <Abs x={TIMECODE_PILL.x0} y={TIMECODE_PILL.y0} w={tcW} h={tcH} r={9} fill="#2a2420">
        <Txt x={0} y={tcH / 2} w={tcW} size={17} weight={500} color="#f5f1e8" align="center" mid>
          {timecodeString(frame)}
        </Txt>
      </Abs>

      <Txt x={AUTOSAVE_X} y={26} size={13} weight={400} color={META_GREY} font={FONT_UI}>
        · 已自动保存
      </Txt>

      {/* 1080p pill */}
      <Abs
        x={PILL_1080.x0}
        y={PILL_1080.y0}
        w={PILL_1080.x1 - PILL_1080.x0}
        h={pillH}
        r={7}
        fill={PILL_BEIGE}
        stroke={INK}
        sw={2}
        style={wobble(13)}
      >
        <Txt x={0} y={pillH / 2} w={PILL_1080.x1 - PILL_1080.x0} size={13} weight={500} align="center" mid>
          1080p
        </Txt>
      </Abs>

      {/* action button: 导出 → 渲染中 99% → 渲染中 99.999% → 完成 ✓ */}
      <Abs
        x={ACTION_BTN.x0}
        y={ACTION_BTN.y0}
        w={btnW}
        h={btnH}
        r={10}
        fill={btnFill}
        stroke={INK}
        sw={2.5}
        style={{
          ...wobble(17),
          overflow: "hidden",
          backgroundImage:
            state === "rendering" || state === "rendering999"
              ? "repeating-linear-gradient(45deg, rgba(31,26,20,0.10) 0 5px, rgba(0,0,0,0) 5px 11px)"
              : undefined,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: btnW,
            height: btnH,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: state === "export" ? 7 : 5,
            fontFamily: FONT_UI,
            fontSize: state === "export" ? 20 : 17,
            fontWeight: 700,
            color: state === "export" ? "#ffffff" : INK,
            textShadow: state === "export" ? "0 1px 0 rgba(31,26,20,0.40)" : undefined,
          }}
        >
          {state === "export" && (
            <svg width="16" height="16" viewBox="0 0 20 20">
              <path d="M10 15 V4" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M5 9 l5 -5.6 l5 5.6" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3.5 17 h13" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          )}
          {label}
          {state === "done" && (
            <svg width="15" height="15" viewBox="0 0 20 20">
              <path d="M3 11 l4.6 4.4 L17 5" stroke={INK} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </Abs>
    </>
  );
};
