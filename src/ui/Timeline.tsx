import React from "react";
import { useCurrentFrame } from "remotion";
import { presentAt, playheadX } from "../beats";
import {
  AUDIO_BAR,
  BEAT_PITCH,
  BEAT_TRI_Y,
  CAPTION,
  CLIP_CARDS,
  CLIP_Y,
  DIVIDER_Y,
  KADIAN_BTN,
  PLAYHEAD_Y,
  PX_PER_SEC,
  RAIL_SIZE,
  RAIL_TOPS,
  RULER_LABEL_Y,
  RULER_RULE_Y,
  TEXT_CLIP,
  TL_X0,
  TRANSITION_BADGES,
  VIDEO_BAND,
  ZOOM_SLIDER,
} from "../layout";
import { rnd } from "../anim";
import { ThumbArt } from "../scenes/Thumbs";
import {
  BEAT_YELLOW,
  CAPTION_GREY,
  CREAM_BTN,
  FONT_UI,
  INK,
  LABEL_GREY,
  MINT_BTN,
  MUSIC_BTN,
  WAVE,
} from "../theme";
import { Abs, Txt } from "./box";

const ClipArt: React.FC<{ art: string }> = ({ art }) => (
  <ThumbArt art={art === "night" || art === "corgi" || art === "disco" ? art : "ramen"} />
);

/** Ruler + rail + video/audio/text lanes + playhead (SPEC §1.5). */
export const Timeline: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const phX = playheadX(frame);

  return (
    <>
      {/* section divider */}
      <Abs x={13} y={DIVIDER_Y - 0.75} w={1266.5 - 13} h={1.5} fill={INK} style={{ opacity: 0.85 }} />

      {/* video track band (drawn before the rail so the T / play / music buttons stay visible) */}
      <Abs x={VIDEO_BAND.x0} y={VIDEO_BAND.y0} w={VIDEO_BAND.x1 - VIDEO_BAND.x0} h={VIDEO_BAND.y1 - VIDEO_BAND.y0} fill="#fbf7f0" />

      {/* ruler labels + baseline rule */}
      <Abs x={13} y={RULER_RULE_Y} w={1266.5 - 13} h={1} fill="#c3bcaa" style={{ opacity: 0.75 }} />
      {/* small tick marks at every quarter second */}
      {Array.from({ length: 65 }, (_, i) => i * 0.25).map((s) => (
        <Abs
          key={`tick${s}`}
          x={TL_X0 + s * PX_PER_SEC - 0.5}
          y={RULER_RULE_Y}
          w={1}
          h={Math.abs(s % 1) < 0.001 ? 7 : 4}
          fill="#a89f8d"
          style={{ opacity: 0.65 }}
        />
      ))}

      {/* rail buttons T / ▶ / ♪ */}
      {[CREAM_BTN, MINT_BTN, MUSIC_BTN].map((fill, i) => (
        <Abs
          key={fill}
          x={38}
          y={RAIL_TOPS[i]}
          w={RAIL_SIZE}
          h={RAIL_SIZE}
          r={8}
          fill={fill}
          stroke={INK}
          sw={1.5}
        >
          {i === 1 ? (
            <svg width={RAIL_SIZE} height={RAIL_SIZE} viewBox="0 0 34 34" style={{ position: "absolute", left: 0, top: 0 }}>
              <path d="M12 8 L25 17 L12 26 Z" fill={INK} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
            </svg>
          ) : (
            <Txt x={0} y={RAIL_SIZE / 2} w={RAIL_SIZE} size={15} weight={700} color={INK} align="center" mid font={FONT_UI}>
              {["T", "•", "♪"][i]}
            </Txt>
          )}
        </Abs>
      ))}

      {/* clip cards */}
      {CLIP_CARDS.filter((c) => t >= c.enterAt).map((c) => {
        const cw = c.x1 - c.x0;
        const ch = CLIP_Y[1] - CLIP_Y[0];
        const k = Math.min(1, (t - c.enterAt) / 0.22);
        return (
          <React.Fragment key={c.id}>
            <Abs
              x={c.x0}
              y={CLIP_Y[0]}
              w={cw}
              h={ch}
              r={8}
              fill="#fdf8ee"
              stroke={INK}
              sw={2}
              style={{
                overflow: "hidden",
                transform: `translateY(${(1 - k) * -18}px)`,
                opacity: Math.min(1, k * 1.6),
              }}
            >
              <div style={{ position: "absolute", inset: 0 }}>
                <ClipArt art={c.art} />
              </div>
              {c.name && (
                <Abs x={4} y={4} w={0} h={15} fill="transparent">
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      height: 15,
                      padding: "0 6px",
                      borderRadius: 5,
                      background: "rgba(253,251,247,0.95)",
                      border: `1.2px solid ${INK}`,
                      fontFamily: FONT_UI,
                      fontSize: 11,
                      lineHeight: "15px",
                      color: INK,
                      whiteSpace: "nowrap",
                      boxSizing: "border-box",
                    }}
                  >
                    {c.name}
                  </div>
                </Abs>
              )}
            </Abs>
          </React.Fragment>
        );
      })}

      {/* white transition badges between the clips */}
      {presentAt.clips(frame) &&
        TRANSITION_BADGES.map((x, i) => (
          <Abs
            key={`badge${x}`}
            x={x - 9}
            y={(CLIP_Y[0] + CLIP_Y[1]) / 2 - 9}
            w={18}
            h={18}
            r={10}
            fill="#ffffff"
            stroke={INK}
            sw={1.4}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" style={{ position: "absolute", left: 0, top: 0 }}>
              {i === 0 && (
                <g stroke="#3f8f86" strokeWidth="1.3" fill="none">
                  <circle cx="9" cy="9" r="6" />
                  <path d="M9 5 a4 4 0 1 1 -3 1.2" />
                </g>
              )}
              {i === 1 && (
                <g stroke="#7d8a86" strokeWidth="1.2" fill="none">
                  <path d="M6 4 h4 l2 2 v8 h-6 z" fill="#fff" />
                  <path d="M10 4 v2 h2" />
                </g>
              )}
              {i === 2 && (
                <g stroke="#8a5a86" strokeWidth="1.2" fill="none">
                  <rect x="4" y="5" width="10" height="8" rx="1.5" fill="#fff" />
                  <path d="M6 8 h5" />
                </g>
              )}
              {i === 3 && (
                <g stroke="#3f8f86" strokeWidth="1.3" fill="none">
                  <circle cx="9" cy="9" r="6" />
                  <path d="M9 9 h3" />
                </g>
              )}
            </svg>
          </Abs>
        ))}

      {/* text clip pill (前方高能预警) — 13.6 s onwards */}
      {presentAt.textPill(frame) && (
        <Abs
          x={TEXT_CLIP.x0}
          y={TEXT_CLIP.y0}
          w={TEXT_CLIP.x1 - TEXT_CLIP.x0}
          h={TEXT_CLIP.y1 - TEXT_CLIP.y0}
          r={11}
          fill="#f5d24e"
          stroke={INK}
          sw={2}
        >
          <Abs x={3} y={2.5} w={18} h={18} r={4} fill="#fdfbf3" stroke={INK} sw={1.3}>
            <Txt x={0} y={9} w={18} size={12} weight={700} color={INK} align="center" mid font={FONT_UI}>
              T
            </Txt>
          </Abs>
          <Txt x={25} y={(TEXT_CLIP.y1 - TEXT_CLIP.y0) / 2} w={140} size={13} weight={600} color={INK} mid font={FONT_UI}>
            前方高能预警
          </Txt>
        </Abs>
      )}

      {/* audio bar + waveform */}
      {presentAt.audio(frame) && (
        <Abs
          x={AUDIO_BAR.x0}
          y={AUDIO_BAR.y0}
          w={AUDIO_BAR.x1 - AUDIO_BAR.x0}
          h={AUDIO_BAR.y1 - AUDIO_BAR.y0}
          r={8}
          fill="#ece8f7"
          stroke={INK}
          sw={2}
          style={{ overflow: "hidden" }}
        >
          <svg width={AUDIO_BAR.x1 - AUDIO_BAR.x0} height={AUDIO_BAR.y1 - AUDIO_BAR.y0} style={{ position: "absolute", left: 0, top: 0 }}>
            {Array.from({ length: Math.floor((AUDIO_BAR.x1 - AUDIO_BAR.x0) / 3.1) }, (_, i) => {
              const cx0 = AUDIO_BAR.x1 - AUDIO_BAR.x0;
              const near = 1 - Math.abs(i / (cx0 / 3.1) - 0.5) * 1.4;
              const hh = 4 + rnd(i + 3) * 18 * Math.max(0.25, near);
              return (
                <rect
                  key={i}
                  x={i * 3.1 + 2}
                  y={20 - hh / 2}
                  width={1.8}
                  height={hh}
                  fill={WAVE}
                  opacity={0.95}
                />
              );
            })}
          </svg>
          <Abs x={4} y={3} w={0} h={14} fill="transparent">
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: 14,
                padding: "0 5px",
                borderRadius: 4,
                background: "rgba(253,251,247,0.92)",
                border: `1px solid ${INK}`,
                fontFamily: FONT_UI,
                fontSize: 11,
                lineHeight: "14px",
                color: LABEL_GREY,
                whiteSpace: "nowrap",
                boxSizing: "border-box",
              }}
            >
              ♪ bgm_小克.wav
            </div>
          </Abs>
        </Abs>
      )}

      {/* 卡点 button + beat triangles */}
      {presentAt.kadian(frame) && (
        <>
          <Abs
            x={KADIAN_BTN.x0}
            y={KADIAN_BTN.y0}
            w={KADIAN_BTN.x1 - KADIAN_BTN.x0}
            h={KADIAN_BTN.y1 - KADIAN_BTN.y0}
            r={12}
            fill="#eec053"
            stroke={INK}
            sw={2}
          >
            <Txt x={0} y={(KADIAN_BTN.y1 - KADIAN_BTN.y0) / 2} w={KADIAN_BTN.x1 - KADIAN_BTN.x0} size={15} weight={600} color={INK} align="center" mid font={FONT_UI}>
              ▽ 卡点
            </Txt>
          </Abs>
          {Array.from({ length: 31 }, (_, i) => TL_X0 + i * BEAT_PITCH).map((x, i) => {
            if (x > 1266) return null;
            const appear = Math.min(1, Math.max(0, (frame - Math.round((20.2 + i * 0.018) * 30)) / 4));
            return (
              <svg
                key={`bt${i}`}
                width="13"
                height="15"
                viewBox="0 0 13 15"
                style={{
                  position: "absolute",
                  left: x - 6.5,
                  top: BEAT_TRI_Y[0],
                  opacity: appear,
                  transform: `scale(${0.5 + 0.5 * appear})`,
                }}
              >
                <path d="M1 1 L12 1 L6.5 14 Z" fill={BEAT_YELLOW} stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
              </svg>
            );
          })}
        </>
      )}

      {/* playhead */}
      <Abs x={phX - 1} y={PLAYHEAD_Y[0]} w={2} h={PLAYHEAD_Y[1] - PLAYHEAD_Y[0]} fill="#e8514f" />
      <svg width="24" height="24" viewBox="0 0 24 24" style={{ position: "absolute", left: phX - 11, top: PLAYHEAD_Y[0] }}>
        <path d="M1 2 h22 v14 l-11 7 l-11 -7 z" fill="#e8514f" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
      </svg>

      {/* ruler labels are re-drawn on top so the playhead flag never hides 0:00 (E1) */}
      {Array.from({ length: 9 }, (_, i) => i * 2).map((s) => (
        <Txt
          key={s}
          x={TL_X0 + s * PX_PER_SEC - 20}
          y={RULER_LABEL_Y - 8}
          w={40}
          size={11}
          weight={400}
          color={LABEL_GREY}
          align="center"
          font={FONT_UI}
        >
          {`0:${String(s).padStart(2, "0")}`}
        </Txt>
      ))}

      {/* bottom bar: zoom slider + segment caption */}
      <Abs x={ZOOM_SLIDER.x0} y={ZOOM_SLIDER.y - 1} w={ZOOM_SLIDER.x1 - ZOOM_SLIDER.x0} h={2} r={1} fill="#cfc7b6" />
      <Abs x={ZOOM_SLIDER.x0 + 26} y={ZOOM_SLIDER.y - 5} w={9} h={9} r={6} fill="#fdfbf4" stroke="#8b8474" sw={1.5} />
      <Txt x={ZOOM_SLIDER.x1 + 4} y={ZOOM_SLIDER.y - 8} size={13} weight={400} color="#b6ae9d" font={FONT_UI}>
        +
      </Txt>
      <Txt x={CAPTION.x - 200} y={CAPTION.y - 8} w={200} size={11} weight={400} color={CAPTION_GREY} align="right" font={FONT_UI}>
        {`片段 ${segCount(frame)} · 总时长 ${segDuration(frame)}`}
      </Txt>
    </>
  );
};

/** Bottom-right segment counter: 0 -> 4 clips, and the total climbing to 10.5 s. */
export const segCount = (frame: number) => {
  const t = frame / 30;
  if (t < 2.6) return 0;
  if (t < 3.2) return 1;
  if (t < 3.9) return 2;
  if (t < 4.6) return 3;
  return 4;
};
export const segDuration = (frame: number) => {
  const t = frame / 30;
  if (t < 2.6) return "0:00.0";
  if (t < 12.1) return "0:0" + (2.4 + (t - 2.6) * 0.42).toFixed(1).replace(/^0/, "");
  if (t < 21.0) return "0:07.2";
  if (t < 23.0) return "0:10.4";
  return "0:10.5";
};
