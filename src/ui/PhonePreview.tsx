import React from "react";
import { useCurrentFrame } from "remotion";
import { phoneCaptionOn, phonePose, sceneAt } from "../beats";
import { NOTCH, PHONE_BODY, PHONE_SCREEN, TRANSPORT_X, TRANSPORT_Y } from "../layout";
import { rnd } from "../anim";
import { CorgiScene } from "../scenes/CorgiScene";
import { DiscoScene } from "../scenes/DiscoScene";
import { NightScene } from "../scenes/NightScene";
import { RamenScene } from "../scenes/RamenScene";
import { BLUE_HEADER, FONT_DISPLAY, FONT_UI, INK } from "../theme";
import { Mascot } from "./Mascot";

const BASE_W = PHONE_BODY.x1 - PHONE_BODY.x0; // 215
const BASE_H = PHONE_BODY.y1 - PHONE_BODY.y0; // 337

/**
 * Centre preview phone (SPEC §1.4 + §6.5 + §9).
 * The body is 198×302 and grows to 310×465 for the hero ending — that growth is
 * part of the phone element, not the camera.
 */
export const PhonePreview: React.FC = () => {
  const frame = useCurrentFrame();
  const pose = phonePose(frame);
  const sx = pose.w / BASE_W;
  const sy = pose.h / BASE_H;
  const scene = sceneAt(frame);

  // the screen area inside the body, in the *base* coordinate system
  const screenX = PHONE_SCREEN.x0 - PHONE_BODY.x0;
  const screenY = PHONE_SCREEN.y0 - PHONE_BODY.y0;
  const screenW = PHONE_SCREEN.x1 - PHONE_SCREEN.x0;
  const screenH = PHONE_SCREEN.y1 - PHONE_SCREEN.y0;

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: pose.cx - BASE_W / 2,
          top: pose.cy - BASE_H / 2,
          width: BASE_W,
          height: BASE_H,
          transform: `scale(${sx}, ${sy})`,
          transformOrigin: "center center",
        }}
      >
        {/* body */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: BASE_W,
            height: BASE_H,
            borderRadius: 30,
            background: "#2a2420",
            border: "2px solid #151110",
            boxSizing: "border-box",
            boxShadow: "0 3px 0 rgba(21,17,16,0.35)",
          }}
        />
        {/* side buttons */}
        <div style={{ position: "absolute", left: -4, top: 58, width: 4, height: 18, borderRadius: 2, background: "#2a2420" }} />
        <div style={{ position: "absolute", left: -4, top: 97, width: 4, height: 17, borderRadius: 2, background: "#2a2420" }} />
        <div style={{ position: "absolute", left: BASE_W, top: 92, width: 4, height: 28, borderRadius: 2, background: "#2a2420" }} />

        {/* screen */}
        <div
          style={{
            position: "absolute",
            left: screenX,
            top: screenY,
            width: screenW,
            height: screenH,
            borderRadius: 22,
            overflow: "hidden",
            background: "#1a1614",
          }}
        >
          {scene === "empty" && <EmptyScreen frame={frame} />}
          {scene === "night" && <NightScene />}
          {scene === "ramen" && <RamenInPhone />}
          {scene === "corgi" && <CorgiScene />}
          {scene === "disco" && <DiscoScene />}

          {scene === "disco" && <DiscoDancers frame={frame} />}
          {phoneCaptionOn(frame) && <CaptionOverlay frame={frame} />}

          {/* notch */}
          <div
            style={{
              position: "absolute",
              left: NOTCH.x0 - PHONE_SCREEN.x0,
              top: NOTCH.y0 - PHONE_SCREEN.y0,
              width: NOTCH.x1 - NOTCH.x0,
              height: NOTCH.y1 - NOTCH.y0,
              borderRadius: 5,
              background: "#0d0b0a",
            }}
          />

          {/* social UI (28.9 s +) */}
          <SocialLayer frame={frame} />
        </div>

        {/* transport row */}
        <Transport frame={frame} />
      </div>
    </>
  );
};

const EmptyScreen: React.FC<{ frame: number }> = () => (
  <div style={{ position: "absolute", inset: 0, background: "#1a1614" }}>
    <div
      style={{
        position: "absolute",
        left: -40,
        top: -30,
        width: 260,
        height: 120,
        background: "linear-gradient(120deg, rgba(255,255,255,0.10), rgba(255,255,255,0))",
        transform: "rotate(-18deg)",
      }}
    />
  </div>
);

const Transport: React.FC<{ frame: number }> = ({ frame }) => (
  // transport plays through the opening, then shows pause once the preview runs (D4)
  <TransportInner playing={frame / 30 >= 4.8} />
);

const TransportInner: React.FC<{ playing: boolean }> = ({ playing }) => (
  <div style={{ position: "absolute", left: 0, top: TRANSPORT_Y - PHONE_BODY.y0, width: BASE_W, height: 20 }}>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: TRANSPORT_X[i] - PHONE_BODY.x0 - 9,
          top: 0,
          width: 18,
          height: 18,
        }}
      >
        {i === 0 && (
          <svg width="18" height="18" viewBox="0 0 18 18">
            <rect x="2" y="3" width="2.4" height="12" fill={INK} />
            <path d="M15 3 L6 9 L15 15 Z" fill={INK} />
          </svg>
        )}
        {i === 1 && (
          <svg width="18" height="18" viewBox="0 0 18 18">
            <circle cx="9" cy="9" r="9" fill="#fdfbf5" stroke={INK} strokeWidth="1.8" />
            {playing ? (
              <>
                <rect x="6.2" y="4.6" width="2.2" height="8.8" fill={INK} />
                <rect x="9.8" y="4.6" width="2.2" height="8.8" fill={INK} />
              </>
            ) : (
              <path d="M7 4.8 L13 9 L7 13.2 Z" fill={INK} />
            )}
          </svg>
        )}
        {i === 2 && (
          <svg width="18" height="18" viewBox="0 0 18 18">
            <rect x="13.6" y="3" width="2.4" height="12" fill={INK} />
            <path d="M3 3 L12 9 L3 15 Z" fill={INK} />
          </svg>
        )}
      </div>
    ))}
  </div>
);

/** 拉面 shot: blue header strip with 拉 面 + the bowl. */
const RamenInPhone: React.FC = () => (
  <div style={{ position: "absolute", inset: 0 }}>
    <RamenScene />
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: 24,
        background: BLUE_HEADER,
        borderBottom: `1.5px solid #2b3a8f`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 2,
          width: "100%",
          height: 24,
          textAlign: "center",
          fontFamily: FONT_UI,
          fontSize: 15,
          lineHeight: "20px",
          color: "#ffffff",
          letterSpacing: 4,
        }}
      >
        拉 面
      </div>
    </div>
  </div>
);

/** The disco scene's three mascots: hero in the middle, two backup dancers. */
const DiscoDancers: React.FC<{ frame: number }> = ({ frame }) => {
  const t = frame / 30;
  const screenW = PHONE_SCREEN.x1 - PHONE_SCREEN.x0;
  const beat = Math.sin(t * Math.PI * 2 * 4.4);
  const bob = Math.abs(Math.sin(t * Math.PI * 2 * 2.2)) * 5;
  return (
    <>
      {[-58, 58].map((dx, i) => (
        <div
          key={`d${i}`}
          style={{
            position: "absolute",
            left: screenW / 2 + dx - 22,
            top: 131 + bob * 0.6,
            opacity: 0.55,
            filter: "brightness(0.55)",
            transform: `scale(${1 + Math.abs(beat) * 0.03})`,
          }}
        >
          <Mascot size={44} eyes="closed" blush armStub={false} walk={t * 2 + i * 0.4} />
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          left: screenW / 2 - 40,
          top: 107 - bob,
          transform: `scale(${1 + Math.abs(beat) * 0.06})`,
        }}
      >
        <Mascot size={80} eyes="closed" blush armStub={false} walk={t * 2.2} />
      </div>
    </>
  );
};

/** 前方高能预警 overlay on the corgi shot. */
const CaptionOverlay: React.FC<{ frame: number }> = ({ frame }) => {
  const t = frame / 30;
  const appear = Math.min(1, Math.max(0, (t - 13.6) / 0.2));
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        bottom: 46,
        width: "100%",
        textAlign: "center",
        opacity: appear,
      }}
    >
      <span
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 26,
          fontWeight: 700,
          color: "#f5e9c0",
          WebkitTextStroke: `4px ${INK}`,
          paintOrder: "stroke fill",
          letterSpacing: 1.5,
        }}
      >
        前方高能预警
      </span>
    </div>
  );
};

/** Social UI stack on the hero ending (10.2w / 2333 / 分享 / captions). */
const SocialLayer: React.FC<{ frame: number }> = ({ frame }) => {
  const t = frame / 30;
  if (t < 26.9) return null;
  const k = Math.min(1, (t - 26.9) / 0.3);
  const likes = Math.round(2333 * Math.min(1, (t - 26.9) / 1.4));
  // view counter climbs 1.5w -> 9.4w -> 10.1w -> 10.2w like the reference (C3)
  const viewsAt = (tt: number) => {
    if (tt <= 27.0) return 1.5;
    if (tt <= 28.0) return 1.5 + ((tt - 27.0) / 1.0) * (9.4 - 1.5);
    if (tt <= 28.5) return 9.4 + ((tt - 28.0) / 0.5) * (10.1 - 9.4);
    if (tt <= 29.5) return 10.1 + ((tt - 28.5) / 1.0) * 0.1;
    return 10.2;
  };
  const views = viewsAt(t).toFixed(1);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: k }}>
      {/* scrims */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 60, background: "linear-gradient(180deg, rgba(20,12,34,0.42), rgba(20,12,34,0))" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 110, background: "linear-gradient(0deg, rgba(16,10,26,0.88), rgba(16,10,26,0))" }} />

      {/* 拿捏了! */}
      <div
        style={{
          position: "absolute",
          left: 16,
          top: 74,
          transform: "rotate(-4deg)",
          opacity: Math.min(1, Math.max(0, (t - 28.4) / 0.25)),
        }}
      >
        <span
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 44,
            fontWeight: 900,
            color: "#f5d24e",
            WebkitTextStroke: `4px ${INK}`,
            paintOrder: "stroke fill",
          }}
        >
          拿捏了!
        </span>
      </div>

      {/* right-hand action rail */}
      <div style={{ position: "absolute", right: 6, top: 62, width: 44, textAlign: "center", fontFamily: FONT_UI }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <svg width="26" height="26" viewBox="0 0 26 26">
            <circle cx="13" cy="13" r="12" fill="#f6e7cf" stroke="#f4efe0" strokeWidth="1.5" />
            <circle cx="13" cy="10" r="4" fill="#cd6c56" />
            <rect x="6" y="15" width="14" height="7" rx="3.5" fill="#cd6c56" />
          </svg>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#ffffff" }}>{`${views}w`}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, marginTop: 8 }}>
          <svg width="24" height="22" viewBox="0 0 24 22">
            <path d="M12 20 C5 14 1 10.4 2.6 6.4 C4 3 9 3 12 7 C15 3 20 3 21.4 6.4 C23 10.4 19 14 12 20 z" fill="#e8514f" stroke="#f4efe0" strokeWidth="1.4" />
          </svg>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#ffffff" }}>{likes}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, marginTop: 8 }}>
          <svg width="24" height="22" viewBox="0 0 24 22">
            <path d="M3 3 h18 v12 h-9 l-5 4 v-4 h-4 z" fill="#f4efe0" />
            <circle cx="8" cy="9" r="1.4" fill="#2a2420" />
            <circle cx="12" cy="9" r="1.4" fill="#2a2420" />
            <circle cx="16" cy="9" r="1.4" fill="#2a2420" />
          </svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, marginTop: 6 }}>
          <svg width="24" height="22" viewBox="0 0 24 22">
            <path d="M4 15 L14 5 l3 3 L7 18 z" fill="#f4efe0" stroke="#2a2420" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M13 19 l7 -7 l1.6 1.6 l-6.6 7 z" fill="#f4efe0" stroke="#2a2420" strokeWidth="1.2" />
          </svg>
          <span style={{ fontSize: 10, fontWeight: 500, color: "#ffffff" }}>分享</span>
        </div>
      </div>

      {/* caption */}
      <div style={{ position: "absolute", left: 12, bottom: 24, fontFamily: FONT_UI }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#ffffff" }}>@小克 · Opus 5.5</div>
        <div style={{ fontSize: 10, fontWeight: 500, color: "#e9e3f5", marginTop: 3 }}>#AI剪辑 #卡点 #code2video</div>
      </div>

      {/* sparkles */}
      {[...Array(6)].map((_, i) => {
        const s = rnd(i + 5);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 14 + s * 140,
              top: 30 + ((rnd(i + 40) * 180 + frame * 0.3) % 200),
              width: 4 + s * 4,
              height: 4 + s * 4,
              background: ["#f5d24e", "#8fe3da", "#e8514f", "#ffffff"][i % 4],
              transform: `rotate(${frame * 3 + i * 40}deg)`,
              opacity: 0.9,
            }}
          />
        );
      })}
    </div>
  );
};
