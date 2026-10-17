import React from "react";
import { INK } from "../theme";

/**
 * 柴犬.mov — pastel-mint polka-dot backdrop with a big flat-vector corgi.
 * 100x160 box.
 */
export const CorgiScene: React.FC = () => (
  <svg viewBox="0 0 100 160" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="mint" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#cdeee0" />
        <stop offset="100%" stopColor="#bfe8d6" />
      </linearGradient>
    </defs>
    <rect width="100" height="160" fill="url(#mint)" />
    <g fill="#ffffff" opacity="0.55">
      <circle cx="12" cy="16" r="2" />
      <circle cx="30" cy="10" r="1.4" />
      <circle cx="52" cy="20" r="2.2" />
      <circle cx="74" cy="12" r="1.6" />
      <circle cx="90" cy="24" r="2" />
      <circle cx="20" cy="44" r="1.6" />
      <circle cx="8" cy="72" r="2" />
      <circle cx="94" cy="60" r="1.7" />
      <circle cx="84" cy="96" r="2" />
      <circle cx="16" cy="120" r="1.8" />
      <circle cx="92" cy="136" r="2.2" />
      <circle cx="40" cy="150" r="1.6" />
    </g>
    {/* hearts */}
    <g fill="#f4a7bd" stroke={INK} strokeWidth="0.6">
      <path d="M26 44 c-3 -4 -8 -1 -6 3 c1.4 3 6 5.4 6 5.4 s4.6 -2.4 6 -5.4 c2 -4 -3 -7 -6 -3 z" />
      <path d="M72 34 c-2.6 -3.4 -7 -0.8 -5.2 2.6 c1.2 2.6 5.2 4.7 5.2 4.7 s4 -2.1 5.2 -4.7 c1.8 -3.4 -2.6 -6 -5.2 -2.6 z" transform="translate(2,-2)" />
    </g>
    {/* body */}
    <g>
      <path d="M30 160 c0 -30 8 -44 20 -44 s20 14 20 44 z" fill="#f7f4ee" stroke={INK} strokeWidth="1.2" />
      <path d="M34 160 c0 -22 6 -34 16 -34 s16 12 16 34 z" fill="#e8a76a" opacity="0.25" />
      {/* head */}
      <path d="M50 60 c19 0 30 13 30 30 c0 18 -13 30 -30 30 s-30 -12 -30 -30 c0 -17 11 -30 30 -30 z" fill="#dd9553" stroke={INK} strokeWidth="1.3" />
      {/* ears */}
      <path d="M28 62 l-8 -22 c-1 -3 2 -5 4 -3 l16 14 z" fill="#dd9553" stroke={INK} strokeWidth="1.3" />
      <path d="M72 62 l8 -22 c1 -3 -2 -5 -4 -3 l-16 14 z" fill="#dd9553" stroke={INK} strokeWidth="1.3" />
      <path d="M27 56 l-4 -12 l9 8 z" fill="#f6c9d2" />
      <path d="M73 56 l4 -12 l-9 8 z" fill="#f6c9d2" />
      {/* muzzle */}
      <ellipse cx="50" cy="100" rx="22" ry="16" fill="#fdfaf4" />
      <ellipse cx="50" cy="92" rx="13" ry="10" fill="#fdfaf4" />
      {/* eyes */}
      <g stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round">
        <path d="M38 88 c2.4 3.2 6 3.2 8.4 0" />
        <path d="M54 88 c2.4 3.2 6 3.2 8.4 0" />
      </g>
      {/* brows / spots */}
      <g fill="#fdfaf4">
        <circle cx="40" cy="80" r="2.1" />
        <circle cx="60" cy="80" r="2.1" />
      </g>
      {/* nose + mouth */}
      <ellipse cx="50" cy="97" rx="3.6" ry="2.8" fill={INK} />
      <path d="M50 100 v3 M50 103 c-2 2.6 -5 1.6 -6 -0.6 M50 103 c2 2.6 5 1.6 6 -0.6" stroke={INK} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* blush */}
      <ellipse cx="33" cy="95" rx="5" ry="3" fill="#f4b6c2" opacity="0.85" />
      <ellipse cx="67" cy="95" rx="5" ry="3" fill="#f4b6c2" opacity="0.85" />
      {/* collar */}
      <path d="M36 118 c8 5 20 5 28 0 l2 6 c-10 6 -22 6 -32 0 z" fill="#d0453c" stroke={INK} strokeWidth="1" />
      <circle cx="50" cy="124" r="3.6" fill="#f6d26b" stroke={INK} strokeWidth="1" />
      {/* paw */}
      <path d="M70 118 c8 -2 12 4 10 9 c-1.6 4 -8 4 -10 0 z" fill="#dd9553" stroke={INK} strokeWidth="1.1" />
    </g>
  </svg>
);

/** Thumbnail version (corgi head only, fits a 64x64-ish tile). */
export const CorgiThumb: React.FC = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
    <rect width="100" height="100" fill="#cdeee0" />
    <g fill="#ffffff" opacity="0.5">
      <circle cx="12" cy="14" r="2" />
      <circle cx="88" cy="20" r="1.6" />
      <circle cx="20" cy="70" r="1.8" />
      <circle cx="82" cy="74" r="2" />
    </g>
    <g transform="translate(50,58) scale(1.05) translate(-50,-88)">
      <path d="M50 60 c19 0 30 13 30 30 c0 18 -13 30 -30 30 s-30 -12 -30 -30 c0 -17 11 -30 30 -30 z" fill="#dd9553" stroke={INK} strokeWidth="1.4" />
      <path d="M28 62 l-8 -22 c-1 -3 2 -5 4 -3 l16 14 z" fill="#dd9553" stroke={INK} strokeWidth="1.4" />
      <path d="M72 62 l8 -22 c1 -3 -2 -5 -4 -3 l-16 14 z" fill="#dd9553" stroke={INK} strokeWidth="1.4" />
      <ellipse cx="50" cy="100" rx="22" ry="16" fill="#fdfaf4" />
      <ellipse cx="50" cy="92" rx="13" ry="10" fill="#fdfaf4" />
      <g stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round">
        <path d="M38 88 c2.4 3.2 6 3.2 8.4 0" />
        <path d="M54 88 c2.4 3.2 6 3.2 8.4 0" />
      </g>
      <ellipse cx="50" cy="97" rx="3.6" ry="2.8" fill={INK} />
      <ellipse cx="33" cy="95" rx="4.4" ry="2.6" fill="#f4b6c2" />
      <ellipse cx="67" cy="95" rx="4.4" ry="2.6" fill="#f4b6c2" />
    </g>
  </svg>
);
