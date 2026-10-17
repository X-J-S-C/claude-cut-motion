import React from "react";
import { INK } from "../theme";

/**
 * 拉面.mp4 — wooden table, a patterned ramen bowl with egg / naruto / nori and a
 * pair of chopsticks lifting noodles, with steam wisps. 100x160 box.
 */
export const RamenScene: React.FC = () => (
  <svg viewBox="0 0 100 160" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f6e7bf" />
        <stop offset="100%" stopColor="#f0dba8" />
      </linearGradient>
      <linearGradient id="table" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#cf9257" />
        <stop offset="100%" stopColor="#b97a42" />
      </linearGradient>
      <linearGradient id="broth" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f0b365" />
        <stop offset="100%" stopColor="#dd9448" />
      </linearGradient>
    </defs>
    <rect width="100" height="160" fill="url(#wall)" />
    {/* steam */}
    <g stroke="#fffaf0" strokeWidth="2" fill="none" opacity="0.85" strokeLinecap="round">
      <path d="M44 46 c-4 -6 4 -10 0 -16" />
      <path d="M53 40 c-4 -7 4 -11 0 -17" />
      <path d="M62 48 c-4 -6 4 -10 0 -15" />
    </g>
    {/* table */}
    <rect y="112" width="100" height="48" fill="url(#table)" />
    <path d="M0 112 H100" stroke={INK} strokeWidth="0.8" opacity="0.35" />
    {/* bowl */}
    <g>
      <path d="M16 96 h68 c0 22 -13 32 -34 32 s-34 -10 -34 -32 z" fill="#fdf8ef" stroke={INK} strokeWidth="1.1" />
      <ellipse cx="50" cy="96" rx="34" ry="12" fill="#fffdf6" stroke={INK} strokeWidth="1.1" />
      <ellipse cx="50" cy="96" rx="30" ry="9.6" fill="url(#broth)" />
      {/* noodles */}
      <g stroke="#f7e39b" strokeWidth="2.1" strokeLinecap="round" fill="none">
        <path d="M30 95 c6 -3 12 2 18 -1" />
        <path d="M36 99 c6 -3 12 2 18 -1" />
        <path d="M30 91 c7 1 13 -3 19 0" />
        <path d="M44 94 c5 -2 9 2 14 0" />
      </g>
      {/* egg */}
      <ellipse cx="38" cy="93" rx="7.4" ry="5" fill="#fffdf4" stroke={INK} strokeWidth="0.9" />
      <ellipse cx="38" cy="93" rx="4" ry="2.7" fill="#f6a83c" />
      {/* naruto */}
      <circle cx="62" cy="94" r="5.4" fill="#fdf5f0" stroke={INK} strokeWidth="0.9" />
      <path d="M62 94 c-2.6 -2.4 -0.4 -4.4 1.6 -2.4 c2 2 -0.4 4.6 -2.6 2.6" fill="#ef7fa0" />
      {/* nori */}
      <rect x="48" y="84" width="8" height="10" rx="1" fill="#20323a" stroke={INK} strokeWidth="0.7" />
      <rect x="57" y="86" width="6" height="8" rx="1" fill="#263b44" stroke={INK} strokeWidth="0.7" />
      {/* scallions */}
      <g fill="#7dbd52">
        <circle cx="45" cy="99" r="1.3" />
        <circle cx="52" cy="100" r="1.2" />
        <circle cx="68" cy="97" r="1.3" />
        <circle cx="33" cy="100" r="1.1" />
      </g>
      {/* pattern band */}
      <path d="M22 112 h56" stroke="#e05a4f" strokeWidth="2.6" />
      <path d="M22 116 h56" stroke="#e05a4f" strokeWidth="1.4" />
      <path d="M25 108 v6 M31 108 v6 M37 108 v6 M43 108 v6 M49 108 v6 M55 108 v6 M61 108 v6 M67 108 v6 M73 108 v6" stroke="#e05a4f" strokeWidth="1.2" />
    </g>
    {/* chopsticks */}
    <g stroke={INK} strokeWidth="1.5" strokeLinecap="round">
      <path d="M96 6 L58 74" stroke="#8a5a33" strokeWidth="2.6" />
      <path d="M99 12 L63 78" stroke="#8a5a33" strokeWidth="2.6" />
    </g>
    <g stroke="#fbeeb6" strokeWidth="1.6" fill="none" strokeLinecap="round">
      <path d="M62 76 c-2 6 -3 10 -1 14" />
      <path d="M66 78 c-1 6 -2 9 0 13" />
    </g>
  </svg>
);

/** Small ramen bowl for a thumbnail (bowl only, bigger in frame). */
export const RamenThumb: React.FC = () => (
  <svg viewBox="0 0 100 160" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
    <rect width="100" height="160" fill="#f2dfb8" />
    <rect y="118" width="100" height="42" fill="#cf9257" />
    <g transform="translate(0,14) scale(1.15) translate(-7,0)">
      <path d="M16 96 h68 c0 22 -13 32 -34 32 s-34 -10 -34 -32 z" fill="#fdf8ef" stroke={INK} strokeWidth="1.2" />
      <ellipse cx="50" cy="96" rx="34" ry="12" fill="#fffdf6" stroke={INK} strokeWidth="1.2" />
      <ellipse cx="50" cy="96" rx="30" ry="9.6" fill="#e8a95c" />
      <g stroke="#f7e39b" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d="M30 95 c6 -3 12 2 18 -1" />
        <path d="M36 99 c6 -3 12 2 18 -1" />
      </g>
      <ellipse cx="38" cy="93" rx="7" ry="4.6" fill="#fffdf4" stroke={INK} strokeWidth="1" />
      <ellipse cx="38" cy="93" rx="3.8" ry="2.4" fill="#f6a83c" />
      <circle cx="62" cy="94" r="5" fill="#fdf5f0" stroke={INK} strokeWidth="1" />
      <rect x="48" y="85" width="8" height="9" rx="1" fill="#20323a" />
      <path d="M22 112 h56" stroke="#e05a4f" strokeWidth="2.6" />
    </g>
  </svg>
);
