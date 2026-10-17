import React from "react";
import { BLUSH, INK, MASCOT, MASCOT_HI } from "../theme";

export type EyeMode = "oval" | "closed" | "sparkle" | "spiral" | "dot";

export type MascotProps = {
  /** body width in canvas px (natural 82) */
  size?: number;
  eyes?: EyeMode;
  blush?: boolean;
  shades?: boolean;
  /** sunglasses pulled down over the eyes (18.0-19.0 s gag) */
  shadesDown?: boolean;
  /** show the small left-side arm stub */
  armStub?: boolean;
  /** walk phase 0..1, splits the legs */
  walk?: number;
  /** vertical body dip in px */
  dip?: number;
  opacity?: number;
  style?: React.CSSProperties;
};

/**
 * The mascot rig from SPEC §6.1: an 82×60 terracotta rounded square, two
 * vertical oval eyes with highlight dots, two 16×15 legs, a left arm stub and
 * optional sunglasses resting on top of the head.
 * The long pointer-arm is drawn separately (it points at UI targets).
 */
export const Mascot: React.FC<MascotProps> = ({
  size = 82,
  eyes = "oval",
  blush = false,
  shades = false,
  shadesDown = false,
  armStub = true,
  walk = 0,
  dip = 0,
  opacity = 1,
  style,
}) => {
  const k = size / 82;
  const legSwing = Math.sin(walk * Math.PI * 2) * 5;
  return (
    <div
      style={{
        width: 82 * k,
        height: (60 + 15) * k,
        opacity,
        transform: `scale(1) translateY(${dip * k}px)`,
        ...style,
      }}
    >
      <svg viewBox="-16 -8 114 91" width={114 * k} height={99 * k} style={{ marginLeft: -16 * k, marginTop: -8 * k }}>
        {/* legs */}
        <g stroke={INK} strokeWidth="2.5" fill={MASCOT} strokeLinejoin="round">
          <g transform={`rotate(${legSwing} 33 60)`}>
            <rect x="14" y="58" width="16" height="15" rx="3" />
          </g>
          <g transform={`rotate(${-legSwing} 49 60)`}>
            <rect x="52" y="58" width="16" height="15" rx="3" />
          </g>
        </g>
        {/* body */}
        <rect x="0" y="0" width="82" height="60" rx="8" fill={MASCOT} stroke={INK} strokeWidth="2.5" />
        {/* top-right inner highlight */}
        <path d="M56 5 h16 c3 0 5 2 5 5 v6" fill="none" stroke={MASCOT_HI} strokeWidth="4" strokeLinecap="round" opacity="0.85" />
        {/* left arm stub (always present) */}
        {armStub && (
          <rect x="-13" y="25" width="15" height="9" rx="3" fill={MASCOT} stroke={INK} strokeWidth="2.5" />
        )}
        {/* eyes */}
        {!shadesDown && eyes === "oval" && (
          <g>
            <ellipse cx="27" cy="20" rx="3.5" ry="6.75" fill="#151110" />
            <ellipse cx="55" cy="20" rx="3.5" ry="6.75" fill="#151110" />
            <circle cx="25.6" cy="17.6" r="1.5" fill="#ffffff" />
            <circle cx="53.6" cy="17.6" r="1.5" fill="#ffffff" />
          </g>
        )}
        {!shadesDown && eyes === "dot" && (
          <g>
            <circle cx="27" cy="20" r="4.2" fill="#151110" />
            <circle cx="55" cy="20" r="4.2" fill="#151110" />
            <circle cx="25.8" cy="18.4" r="1.4" fill="#ffffff" />
            <circle cx="53.8" cy="18.4" r="1.4" fill="#ffffff" />
          </g>
        )}
        {!shadesDown && eyes === "closed" && (
          <g stroke="#151110" strokeWidth="3.5" fill="none" strokeLinecap="round">
            <path d="M21 20 c2.6 -4.4 7.4 -4.4 10 0" />
            <path d="M51 20 c2.6 -4.4 7.4 -4.4 10 0" />
          </g>
        )}
        {eyes === "sparkle" && (
          <g>
            <path d="M27 12 l2.6 5.4 l5.4 2.6 l-5.4 2.6 l-2.6 5.4 l-2.6 -5.4 l-5.4 -2.6 l5.4 -2.6 z" fill="#f5d24e" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
            <path d="M55 12 l2.6 5.4 l5.4 2.6 l-5.4 2.6 l-2.6 5.4 l-2.6 -5.4 l-5.4 -2.6 l5.4 -2.6 z" fill="#f5d24e" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
          </g>
        )}
        {eyes === "spiral" && (
          <g stroke="#151110" strokeWidth="1.8" fill="none">
            <path d="M27 20 m0 -5.6 a5.6 5.6 0 1 1 -0.1 0 m0.1 2.4 a3.2 3.2 0 1 1 -0.1 0 m0.1 1.9 a1.3 1.3 0 1 1 -0.1 0" />
            <path d="M55 20 m0 -5.6 a5.6 5.6 0 1 1 -0.1 0 m0.1 2.4 a3.2 3.2 0 1 1 -0.1 0 m0.1 1.9 a1.3 1.3 0 1 1 -0.1 0" />
          </g>
        )}
        {/* blush */}
        {blush && (
          <g fill={BLUSH} opacity="0.65">
            <ellipse cx="20" cy="34" rx="7" ry="4" />
            <ellipse cx="62" cy="34" rx="7" ry="4" />
          </g>
        )}
        {/* sunglasses pulled down over the eyes */}
        {shadesDown && (
          <g transform="rotate(-4 41 20)">
            <rect x="12" y="11" width="58" height="17" rx="5" fill="#151110" stroke={INK} strokeWidth="1.8" />
            <rect x="16" y="14" width="20" height="9" rx="3" fill="#3a3f4a" />
            <rect x="46" y="14" width="20" height="9" rx="3" fill="#3a3f4a" />
            <g stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round">
              <path d="M20 17 l4 -2.5" />
              <path d="M50 17 l4 -2.5" />
            </g>
          </g>
        )}
        {/* sunglasses resting on the top edge */}
        {shades && (
          <g transform="rotate(-6 41 0)">
            <rect x="18" y="-9" width="46" height="12" rx="4" fill="#151110" stroke={INK} strokeWidth="1.6" />
            <rect x="22" y="-6" width="15" height="6" rx="2.4" fill="#3a3f4a" />
            <rect x="45" y="-6" width="15" height="6" rx="2.4" fill="#3a3f4a" />
            <g stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round">
              <path d="M25 -4 l3 -2" />
              <path d="M48 -4 l3 -2" />
              <path d="M38 -5 l3 -2" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};

/** Tapered pointer-arm (rod + round "hand") drawn in canvas space. */
export const PointerArm: React.FC<{
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  opacity?: number;
}> = ({ x0, y0, x1, y1, opacity = 1 }) => {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const len = Math.hypot(dx, dy) || 1;
  const nx = (-dy / len) * 2.5;
  const ny = (dx / len) * 2.5;
  const nx2 = (-dy / len) * 1.75;
  const ny2 = (dx / len) * 1.75;
  return (
    <g opacity={opacity}>
      <polygon
        points={`${x0 + nx2},${y0 + ny2} ${x1 + nx},${y1 + ny} ${x1 - nx},${y1 - ny} ${x0 - nx2},${y0 - ny2}`}
        fill={MASCOT}
        stroke={INK}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <circle cx={x1} cy={y1} r="5" fill={MASCOT} stroke={INK} strokeWidth="2.2" />
    </g>
  );
};
