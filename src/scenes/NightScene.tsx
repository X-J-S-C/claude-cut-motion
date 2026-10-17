import React from "react";
import { INK, YELLOW } from "../theme";

/**
 * 夜景.mp4 — a flat-vector night skyline: navy gradient sky, crescent moon,
 * twinkling stars and a lit-up city block. Drawn in a 100x160 box; callers use
 * `preserveAspectRatio="xMidYMid slice"` so it can fill a phone screen or a
 * timeline thumbnail.
 */
export const NightScene: React.FC<{ stars?: boolean }> = () => (
  <svg viewBox="0 0 100 160" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="nightSky" x1="0" y1="0" x2="0.2" y2="1">
        <stop offset="0%" stopColor="#2b2b58" />
        <stop offset="55%" stopColor="#3b3a6e" />
        <stop offset="100%" stopColor="#4a4a86" />
      </linearGradient>
      <linearGradient id="nightGround" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3a3a68" />
        <stop offset="100%" stopColor="#242446" />
      </linearGradient>
    </defs>
    <rect width="100" height="160" fill="url(#nightSky)" />
    {/* stars */}
    <g fill="#fdf6d8">
      <circle cx="16" cy="18" r="0.8" />
      <circle cx="34" cy="10" r="0.6" />
      <circle cx="52" cy="24" r="0.9" />
      <circle cx="74" cy="14" r="0.7" />
      <circle cx="86" cy="30" r="1" />
      <circle cx="24" cy="40" r="0.6" />
      <circle cx="64" cy="42" r="0.7" />
      <circle cx="90" cy="52" r="0.6" />
      <circle cx="44" cy="33" r="0.5" />
    </g>
    {/* sparkle stars */}
    <g stroke="#fffbe8" strokeWidth="0.9" strokeLinecap="round">
      <path d="M40 22 v5 M37.5 24.5 h5" />
      <path d="M78 46 v6 M75 49 h6" />
    </g>
    {/* moon */}
    <g>
      <circle cx="30" cy="26" r="8.4" fill="#f7df7a" />
      <circle cx="26" cy="23" r="8.4" fill="#3b3a6e" opacity="0.96" />
    </g>
    {/* skyline */}
    <g fill={YELLOW}>
      <rect x="4" y="96" width="9" height="64" />
      <rect x="15" y="84" width="11" height="76" />
      <rect x="28" y="104" width="8" height="56" />
      <rect x="38" y="92" width="12" height="68" />
      <rect x="52" y="108" width="9" height="52" />
      <rect x="63" y="88" width="13" height="72" />
      <rect x="78" y="100" width="10" height="60" />
      <rect x="90" y="90" width="8" height="70" />
    </g>
    <g fill="#2a2a4e" stroke="#1d1d3a" strokeWidth="0.8">
      <rect x="4" y="128" width="9" height="32" />
      <rect x="15" y="120" width="11" height="40" />
      <rect x="28" y="132" width="8" height="28" />
      <rect x="38" y="126" width="12" height="34" />
      <rect x="52" y="136" width="9" height="24" />
      <rect x="63" y="122" width="13" height="38" />
      <rect x="78" y="130" width="10" height="30" />
      <rect x="90" y="124" width="8" height="36" />
    </g>
    {/* lit windows */}
    <g fill="#fbe58a">
      <rect x="17" y="90" width="2" height="2.6" />
      <rect x="21" y="90" width="2" height="2.6" />
      <rect x="17" y="96" width="2" height="2.6" />
      <rect x="21" y="102" width="2" height="2.6" />
      <rect x="40" y="98" width="2" height="2.6" />
      <rect x="45" y="98" width="2" height="2.6" />
      <rect x="40" y="106" width="2" height="2.6" />
      <rect x="45" y="112" width="2" height="2.6" />
      <rect x="66" y="94" width="2" height="2.6" />
      <rect x="71" y="94" width="2" height="2.6" />
      <rect x="66" y="102" width="2" height="2.6" />
      <rect x="71" y="110" width="2" height="2.6" />
      <rect x="80" y="106" width="2" height="2.6" />
      <rect x="85" y="106" width="2" height="2.6" />
    </g>
    <rect y="152" width="100" height="8" fill="url(#nightGround)" />
    <path d="M0 152 H100" stroke={INK} strokeWidth="0.6" opacity="0.25" />
  </svg>
);

/** Small skyline for the 素材 thumbnail (no moon overhang). */
export const NightThumb: React.FC = () => <NightScene />;
