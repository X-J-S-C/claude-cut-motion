import React from "react";
import { useCurrentFrame } from "remotion";
import { activeTab } from "../beats";
import {
  ASSET_CARDS,
  IMPORT_SLOTS,
  LEFT_PANEL,
  TABS,
  TABS_Y,
  TEXT_PRESETS,
  TRANS_TILES,
} from "../layout";
import { ThumbArt } from "../scenes/Thumbs";
import {
  ACTIVE_TAB,
  FONT_DISPLAY,
  FONT_UI,
  INK,
  LABEL_GREY,
  PANEL,
  PLUM,
  SUB_GREY,
  TAB_OFF,
  TILE_GREY,
  YELLOW,
} from "../theme";
import { Abs, Txt, wobble } from "./box";

const Art: React.FC<{ art: string }> = ({ art }) => (
  <ThumbArt art={art === "night" || art === "corgi" || art === "disco" ? art : "ramen"} />
);

/** 素材 / 转场 / 文字 tab column. */
export const LeftPanel: React.FC = () => {
  const frame = useCurrentFrame();
  const tab = activeTab(frame);
  const panelW = LEFT_PANEL.x1 - LEFT_PANEL.x0;
  const panelH = LEFT_PANEL.y1 - LEFT_PANEL.y0;
  const tabH = TABS_Y[1] - TABS_Y[0];

  return (
    <>
      <Abs
        x={LEFT_PANEL.x0}
        y={LEFT_PANEL.y0}
        w={panelW}
        h={panelH}
        r={10}
        fill={PANEL}
        stroke={INK}
        sw={2.5}
        style={{ boxShadow: "2px 3px 0 rgba(31,26,20,0.10)", overflow: "hidden" }}
      >
        {/*
          Page content is authored in canvas coordinates. An `Abs` uses
          box-sizing: border-box, so its children resolve against the padding
          box, which starts (2.5, 2.5) inside the panel. Shift the wrapper back
          by the panel origin + border so canvas numbers land where the spec
          says they do.
        */}
        <div style={{ position: "absolute", left: -LEFT_PANEL.x0 - 2.5, top: -LEFT_PANEL.y0 - 2.5, width: 1280, height: 720 }}>
        {/* ---------------- 素材 ---------------- */}
        {tab === "studio" &&
          ASSET_CARDS.map((card, i) => {
            const cw = card.rect.x1 - card.rect.x0;
            const ch = card.rect.y1 - card.rect.y0;
            const selected = i === 0;
            return (
              <React.Fragment key={card.name}>
                <Abs
                  x={card.rect.x0}
                  y={card.rect.y0}
                  w={cw}
                  h={ch}
                  r={8}
                  fill="#ffffff"
                  stroke={INK}
                  sw={2}
                  style={{ overflow: "hidden", ...wobble(30 + i) }}
                >
                  <div style={{ position: "absolute", inset: 0 }}>
                    <Art art={card.art} />
                  </div>
                  {/* duration badge, inset from the inner corner */}
                  <Abs x={cw - 4 - 26 - 4} y={ch - 4 - 13 - 4} w={26} h={13} r={6} fill="#2a2420">
                    <Txt x={0} y={6.5} w={26} size={9} weight={600} color="#f5f1e8" align="center" mid>
                      {card.dur}
                    </Txt>
                  </Abs>
                </Abs>
                {selected && (
                  <Abs
                    x={card.rect.x0 - 3}
                    y={card.rect.y0 - 3}
                    w={cw + 6}
                    h={ch + 6}
                    r={10}
                    stroke={YELLOW}
                    sw={2}
                  />
                )}
              </React.Fragment>
            );
          })}

        {tab === "studio" &&
          IMPORT_SLOTS.map((slot, i) => (
            <React.Fragment key={`imp${i}`}>
              <Abs
                x={slot.x0}
                y={slot.y0}
                w={slot.x1 - slot.x0}
                h={slot.y1 - slot.y0}
                r={8}
                stroke="#b9b2a6"
                sw={1.5}
                style={{ borderStyle: "dashed" }}
              >
                <Txt x={0} y={(slot.y1 - slot.y0) / 2 - 13} w={slot.x1 - slot.x0} size={26} weight={400} color="#c8c1b4" align="center">
                  ＋
                </Txt>
              </Abs>
              <Txt x={slot.x0} y={slot.y1 + 2} w={slot.x1 - slot.x0} size={11} weight={400} color="#b9b2a6" align="center" font={FONT_UI}>
                导入素材
              </Txt>
            </React.Fragment>
          ))}

        {/* asset captions last, so no card can paint over a descender */}
        {tab === "studio" &&
          ASSET_CARDS.map((card) => (
            <Txt
              key={`cap-${card.name}`}
              x={card.rect.x0}
              y={card.rect.y1 + 2}
              w={card.rect.x1 - card.rect.x0}
              size={11}
              weight={400}
              color={LABEL_GREY}
              align="center"
              font={FONT_UI}
              style={{ height: 11, lineHeight: "11px" }}
            >
              {card.name}
            </Txt>
          ))}

        {/* ---------------- 转场 ---------------- */}
        {tab === "transition" &&
          TRANS_TILES.map((tile, i) => {
            const tw = tile.rect.x1 - tile.rect.x0;
            const th = tile.rect.y1 - tile.rect.y0;
            // tile 1 flips grey -> lavender at 9.3 s (B15); everything else keeps its fill
            const greyed = i === 0 && frame / 30 < 9.3;
            return (
              <React.Fragment key={tile.label}>
                <Abs
                  x={tile.rect.x0}
                  y={tile.rect.y0}
                  w={tw}
                  h={th}
                  r={8}
                  fill={greyed ? TILE_GREY : tile.fill}
                  stroke={INK}
                  sw={2}
                  style={{ ...wobble(40 + i), overflow: "hidden" }}
                >
                  <TileIcon index={i} greyed={greyed} />
                </Abs>
                <Txt
                  x={tile.rect.x0}
                  y={tile.rect.y1 + 1}
                  w={tw}
                  size={11}
                  weight={400}
                  color={greyed ? "#b3ab9c" : SUB_GREY}
                  align="center"
                  font={FONT_UI}
                >
                  {tile.label}
                </Txt>
              </React.Fragment>
            );
          })}

        {/* ---------------- 文字 ---------------- */}
        {tab === "text" &&
          TEXT_PRESETS.map((p, i) => {
            const pw = p.rect.x1 - p.rect.x0;
            const ph = p.rect.y1 - p.rect.y0;
            const fills = ["#fdf3d6", "#fbdce8", PLUM];
            return (
              <Abs
                key={p.kind}
                x={p.rect.x0}
                y={p.rect.y0}
                w={pw}
                h={ph}
                r={10}
                fill={fills[i]}
                stroke={INK}
                sw={2}
                style={{ ...wobble(50 + i), overflow: "hidden" }}
              >
                {p.kind === "gaoneng" && (
                  <Txt
                    x={0}
                    y={ph / 2 - 4}
                    w={pw}
                    size={26}
                    weight={700}
                    color="#e8c24a"
                    align="center"
                    font={FONT_DISPLAY}
                    strokeColor={INK}
                    strokeW={3}
                    shadow="0 2px 0 rgba(31,26,20,0.75)"
                    rotate={-2}
                    mid
                  >
                    前方高能
                  </Txt>
                )}
                {p.kind === "haoye" && (
                  <Abs x={pw / 2 - 62} y={ph / 2 - 22} w={124} h={44} r={22} fill="#ffffff">
                    <Txt
                      x={0}
                      y={22}
                      w={124}
                      size={22}
                      weight={700}
                      color="#e86a93"
                      align="center"
                      font={FONT_DISPLAY}
                      mid
                    >
                      好耶~
                    </Txt>
                  </Abs>
                )}
                {p.kind === "neon" && (
                  <Txt
                    x={0}
                    y={ph / 2}
                    w={pw}
                    size={24}
                    weight={700}
                    color="#f2ecff"
                    align="center"
                    font={FONT_DISPLAY}
                    shadow="0 0 10px rgba(180,140,240,0.85), 0 0 22px rgba(180,140,240,0.55)"
                    letter={1}
                    mid
                  >
                    霓虹 NEON
                  </Txt>
                )}
              </Abs>
            );
          })}
        </div>
      </Abs>

      {/* tabs sit above the panel body so the active pill can overlap its edge */}
      {TABS.map((tabDef, i) => {
        const active =
          (tab === "studio" && i === 0) || (tab === "transition" && i === 1) || (tab === "text" && i === 2);
        return (
          <Abs
            key={tabDef.label}
            x={tabDef.x0}
            y={TABS_Y[0]}
            w={tabDef.x1 - tabDef.x0}
            h={tabH}
            r={8}
            fill={active ? ACTIVE_TAB : TAB_OFF}
            stroke={active ? INK : "#a89f8d"}
            sw={1.5}
            style={wobble(20 + i)}
          >
            <Txt
              x={0}
              y={tabH / 2}
              w={tabDef.x1 - tabDef.x0}
              size={15}
              weight={500}
              color={active ? INK : "#4a443c"}
              align="center"
              font={FONT_UI}
              mid
            >
              {tabDef.label}
            </Txt>
          </Abs>
        );
      })}
    </>
  );
};

/** Six transition pictograms, drawn as flat vectors. */
const TileIcon: React.FC<{ index: number; greyed: boolean }> = ({ index, greyed }) => {
  const c = greyed ? "#9a9384" : "#3f8f86";
  const stroke = { stroke: c, strokeWidth: 2, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {index === 0 && (
        <svg width="42" height="42" viewBox="0 0 42 42">
          <circle cx="21" cy="21" r="17" {...stroke} strokeWidth="2.2" />
          <path d="M21 11 a10 10 0 1 1 -7 3" {...stroke} strokeWidth="2.6" />
          <path d="M14 8 l1.5 6 l6 -1.5" {...stroke} strokeWidth="2.6" />
        </svg>
      )}
      {index === 1 && (
        <svg width="42" height="42" viewBox="0 0 42 42">
          <path d="M12 8 h13 l6 6 v20 h-19 z" fill="#ffffff" stroke="#7d8a86" strokeWidth="2" strokeLinejoin="round" />
          <path d="M25 8 v6 h6" stroke="#7d8a86" strokeWidth="2" fill="none" />
          <path d="M16 20 h10 M16 25 h8" stroke="#9aa5a0" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="31" cy="31" r="7" fill="#cff0e4" stroke="#3f8f86" strokeWidth="1.8" />
          <path d="M31 27 a4 4 0 1 1 -2.8 1.2" stroke="#3f8f86" strokeWidth="1.6" fill="none" />
        </svg>
      )}
      {index === 2 && (
        <svg width="42" height="42" viewBox="0 0 42 42">
          <rect x="9" y="13" width="24" height="16" rx="3" fill="#ffffff" stroke="#8a5a86" strokeWidth="2" />
          <rect x="12" y="17" width="10" height="4" fill="#a86ba4" />
          <rect x="12" y="23" width="16" height="3" fill="#c9a3c6" />
          <path d="M30 9 v5 M35 16 h-5 M8 32 v4" stroke="#8a5a86" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
      {index === 3 && (
        <svg width="42" height="42" viewBox="0 0 42 42">
          <circle cx="19" cy="18" r="9" {...stroke} strokeWidth="2.2" />
          <path d="M25.5 24.5 l7 7" {...stroke} strokeWidth="3.2" />
          <path d="M15 18 h8 M19 14 v8" {...stroke} strokeWidth="2" />
        </svg>
      )}
      {index === 4 && (
        <svg width="42" height="42" viewBox="0 0 42 42">
          <rect x="8" y="12" width="18" height="18" rx="4" fill="#8fd6cb" stroke="#3f8f86" strokeWidth="2" />
          <path d="M20 21 h12 M27 16 l5 5 l-5 5" {...stroke} strokeWidth="2" />
          <path d="M32 12 h4 M33 30 h4" stroke="#3f8f86" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
      {index === 5 && (
        <svg width="42" height="42" viewBox="0 0 42 42">
          <rect x="8" y="12" width="16" height="16" rx="3" fill="#b9a7d8" stroke="#6f63af" strokeWidth="2" />
          <rect x="19" y="17" width="16" height="16" rx="3" fill="none" stroke="#8b7fb8" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="30" cy="27" r="1.6" fill="#6f63af" />
          <circle cx="34" cy="21" r="1.3" fill="#6f63af" />
        </svg>
      )}
    </div>
  );
};
