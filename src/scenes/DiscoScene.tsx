import React from "react";
import { INK } from "../theme";

/**
 * 小克蹦迪.mp4 — purple disco room: mirror ball, light rays and a
 * perspective-checkered dance floor. The dancing mascot is drawn on top by
 * `PhonePreview` so it can move.
 * 100x160 box.
 */
export const DiscoScene: React.FC<{ hue?: number }> = () => (
  <svg viewBox="0 0 100 160" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="discoBg" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#8b6fc0" />
        <stop offset="55%" stopColor="#b07ac9" />
        <stop offset="100%" stopColor="#a45fb0" />
      </linearGradient>
      <linearGradient id="ballG" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f4f2f7" />
        <stop offset="50%" stopColor="#cfc9dd" />
        <stop offset="100%" stopColor="#a9a2be" />
      </linearGradient>
      <linearGradient id="rayA" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect width="100" height="160" fill="url(#discoBg)" />
    {/* light rays */}
    <g opacity="0.5">
      <path d="M50 24 L10 118 L26 118 Z" fill="url(#rayA)" />
      <path d="M50 24 L74 118 L90 118 Z" fill="url(#rayA)" />
      <path d="M50 24 L-2 96 L6 104 Z" fill="url(#rayA)" />
      <path d="M50 24 L94 92 L100 100 Z" fill="url(#rayA)" />
    </g>
    {/* mirror ball */}
    <g>
      <path d="M50 0 v16" stroke={INK} strokeWidth="1.2" />
      <circle cx="50" cy="26" r="12" fill="url(#ballG)" stroke={INK} strokeWidth="1.2" />
      <g stroke="#9b94ae" strokeWidth="0.7" opacity="0.9">
        <path d="M39 21 h22 M38 26 h24 M39 31 h22" />
        <path d="M44 15 v22 M50 14 v24 M56 15 v22" />
      </g>
      <path d="M43 19 l3 -2 M47 22 l3 -2 M54 27 l3 -2" stroke="#ffffff" strokeWidth="1" />
    </g>
    {/* floor */}
    <path d="M0 112 H100 V160 H0 Z" fill="#2b2350" />
    <g stroke="#1b1738" strokeWidth="0.5">
      <path d="M0 118 H100 M0 128 H100 M0 142 H100" />
      <path d="M50 112 L50 160" />
      <path d="M50 112 L-20 160 M50 112 L120 160" />
      <path d="M50 112 L16 160 M50 112 L84 160" />
    </g>
    <g opacity="0.85">
      <path d="M0 118 h25 v10 H0 z" fill="#4a3f86" />
      <path d="M25 118 h25 v10 H25 z" fill="#f0a9c8" />
      <path d="M50 118 h25 v10 H50 z" fill="#5ecfd0" />
      <path d="M75 118 h25 v10 H75 z" fill="#4a3f86" />
      <path d="M0 128 h17 v14 H0 z" fill="#5ecfd0" />
      <path d="M17 128 h33 v14 H17 z" fill="#4a3f86" />
      <path d="M50 128 h33 v14 H50 z" fill="#f0a9c8" />
      <path d="M83 128 h17 v14 H83 z" fill="#5ecfd0" />
      <path d="M0 142 h12 v18 H0 z" fill="#f0a9c8" />
      <path d="M12 142 h38 v18 H12 z" fill="#5ecfd0" />
      <path d="M50 142 h38 v18 H50 z" fill="#4a3f86" />
      <path d="M88 142 h12 v18 H88 z" fill="#f0a9c8" />
    </g>
    {/* sparkles */}
    <g stroke="#fff8d8" strokeWidth="1" strokeLinecap="round">
      <path d="M24 46 v6 M21 49 h6" />
      <path d="M80 62 v5 M77.5 64.5 h5" />
      <path d="M66 14 v5 M63.5 16.5 h5" />
      <path d="M14 96 v4 M12 98 h4" />
    </g>
  </svg>
);
