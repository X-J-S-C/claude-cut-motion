import React from "react";
import { INK } from "../theme";

/**
 * Landscape thumbnail art for the 素材 cards and the timeline clip cards.
 *
 * The phone scenes are portrait (100×160) and read badly when sliced into a
 * ~113×79 card, so each art gets a dedicated landscape composition here. Same
 * palette and drawing language, drawn in a 113×79 box.
 */

const BOX = { w: 113, h: 79 };

const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox={`0 0 ${BOX.w} ${BOX.h}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
    {children}
  </svg>
);

const Night: React.FC = () => (
  <Shell>
    <defs>
      <linearGradient id="tNight" x1="0" y1="0" x2="0.2" y2="1">
        <stop offset="0%" stopColor="#2b2b58" />
        <stop offset="100%" stopColor="#45447c" />
      </linearGradient>
    </defs>
    <rect width={BOX.w} height={BOX.h} fill="url(#tNight)" />
    <circle cx="24" cy="20" r="9" fill="#f7df7a" />
    <circle cx="19.5" cy="17" r="9" fill="#39386c" />
    <g fill="#fdf6d8">
      <circle cx="52" cy="12" r="1" />
      <circle cx="70" cy="20" r="0.8" />
      <circle cx="88" cy="10" r="1.1" />
      <circle cx="100" cy="26" r="0.8" />
      <circle cx="62" cy="30" r="0.7" />
    </g>
    <g stroke="#fffbe8" strokeWidth="1" strokeLinecap="round">
      <path d="M76 8 v5 M73.5 10.5 h5" />
    </g>
    {/* skyline */}
    <g fill="#f6d76b">
      <rect x="4" y="44" width="12" height="35" />
      <rect x="18" y="36" width="14" height="43" />
      <rect x="34" y="50" width="10" height="29" />
      <rect x="46" y="42" width="16" height="37" />
      <rect x="64" y="52" width="12" height="27" />
      <rect x="78" y="38" width="15" height="41" />
      <rect x="95" y="48" width="12" height="31" />
    </g>
    <g fill="#2a2a4e">
      <rect x="4" y="60" width="12" height="19" />
      <rect x="18" y="54" width="14" height="25" />
      <rect x="34" y="64" width="10" height="15" />
      <rect x="46" y="58" width="16" height="21" />
      <rect x="64" y="66" width="12" height="13" />
      <rect x="78" y="56" width="15" height="23" />
      <rect x="95" y="62" width="12" height="17" />
    </g>
    <g fill="#fbe58a">
      <rect x="21" y="40" width="2" height="2.4" />
      <rect x="26" y="40" width="2" height="2.4" />
      <rect x="21" y="46" width="2" height="2.4" />
      <rect x="49" y="46" width="2" height="2.4" />
      <rect x="55" y="46" width="2" height="2.4" />
      <rect x="81" y="43" width="2" height="2.4" />
      <rect x="87" y="43" width="2" height="2.4" />
    </g>
  </Shell>
);

const Ramen: React.FC = () => (
  <Shell>
    <rect width={BOX.w} height={BOX.h} fill="#f6e7bf" />
    <rect y="56" width={BOX.w} height="23" fill="#cf9257" />
    <path d={`M0 56 H${BOX.w}`} stroke={INK} strokeWidth="0.7" opacity="0.35" />
    {/* steam */}
    <g stroke="#fffaf0" strokeWidth="1.8" fill="none" opacity="0.9" strokeLinecap="round">
      <path d="M48 24 c-3 -4 3 -7 0 -11" />
      <path d="M57 20 c-3 -4 3 -7 0 -11" />
      <path d="M66 25 c-3 -4 3 -7 0 -11" />
    </g>
    {/* bowl */}
    <path d="M30 46 h54 c0 16 -10 22 -27 22 s-27 -6 -27 -22 z" fill="#fdf8ef" stroke={INK} strokeWidth="1.1" />
    <ellipse cx="57" cy="46" rx="27" ry="9.5" fill="#fffdf6" stroke={INK} strokeWidth="1.1" />
    <ellipse cx="57" cy="46" rx="23.5" ry="7.6" fill="#e8a95c" />
    <g stroke="#f7e39b" strokeWidth="1.9" strokeLinecap="round" fill="none">
      <path d="M40 45 c5 -2.5 10 1.5 15 -1" />
      <path d="M44 49 c5 -2.5 10 1.5 15 -1" />
    </g>
    <ellipse cx="46" cy="44" rx="6" ry="3.8" fill="#fffdf4" stroke={INK} strokeWidth="0.8" />
    <ellipse cx="46" cy="44" rx="3.2" ry="2" fill="#f6a83c" />
    <circle cx="68" cy="45" r="4.2" fill="#fdf5f0" stroke={INK} strokeWidth="0.8" />
    <path d="M68 45 c-2 -1.8 -0.3 -3.4 1.2 -1.8 c1.5 1.5 -0.3 3.5 -2 2" fill="#ef7fa0" />
    <rect x="54" y="37" width="7" height="8" rx="1" fill="#20323a" stroke={INK} strokeWidth="0.6" />
    <path d="M34 58 h46" stroke="#e05a4f" strokeWidth="2.4" />
    <path d="M37 55 v3 M43 55 v3 M49 55 v3 M55 55 v3 M61 55 v3 M67 55 v3 M73 55 v3" stroke="#e05a4f" strokeWidth="1.1" />
    {/* chopsticks */}
    <g strokeLinecap="round">
      <path d="M104 6 L72 40" stroke="#8a5a33" strokeWidth="2.4" />
      <path d="M110 11 L77 43" stroke="#8a5a33" strokeWidth="2.4" />
      <path d="M104 6 L72 40" stroke={INK} strokeWidth="0.7" opacity="0.35" />
      <path d="M110 11 L77 43" stroke={INK} strokeWidth="0.7" opacity="0.35" />
    </g>
  </Shell>
);

const Corgi: React.FC = () => (
  <Shell>
    <rect width={BOX.w} height={BOX.h} fill="#cdeee0" />
    <g fill="#ffffff" opacity="0.6">
      <circle cx="10" cy="12" r="2" />
      <circle cx="96" cy="16" r="1.6" />
      <circle cx="16" cy="60" r="1.8" />
      <circle cx="100" cy="58" r="2" />
      <circle cx="60" cy="66" r="1.4" />
    </g>
    <path d="M88 20 c-2.4 -3.4 -6.6 -0.8 -4.8 2.6 c1.2 2.4 4.8 4.4 4.8 4.4 s3.6 -2 4.8 -4.4 c1.8 -3.4 -2.4 -6 -4.8 -2.6 z" fill="#f4a7bd" stroke={INK} strokeWidth="0.6" />
    {/* body */}
    <ellipse cx="57" cy="86" rx="26" ry="20" fill="#f7f4ee" stroke={INK} strokeWidth="1.2" />
    {/* head */}
    <path d="M57 22 c15 0 23 10 23 23 c0 14 -10 23 -23 23 s-23 -9 -23 -23 c0 -13 8 -23 23 -23 z" fill="#dd9553" stroke={INK} strokeWidth="1.3" />
    <path d="M40 24 l-6 -17 c-1 -2.4 1.6 -3.8 3.2 -2.2 l12 10 z" fill="#dd9553" stroke={INK} strokeWidth="1.3" />
    <path d="M74 24 l6 -17 c1 -2.4 -1.6 -3.8 -3.2 -2.2 l-12 10 z" fill="#dd9553" stroke={INK} strokeWidth="1.3" />
    <path d="M39 20 l-3 -9 l7 6 z" fill="#f6c9d2" />
    <path d="M75 20 l3 -9 l-7 6 z" fill="#f6c9d2" />
    <ellipse cx="57" cy="52" rx="16" ry="11" fill="#fdfaf4" />
    <ellipse cx="57" cy="46" rx="9.5" ry="7" fill="#fdfaf4" />
    <g stroke={INK} strokeWidth="1.5" fill="none" strokeLinecap="round">
      <path d="M48 42 c2 2.6 5 2.6 7 0" />
      <path d="M59 42 c2 2.6 5 2.6 7 0" />
    </g>
    <ellipse cx="57" cy="50" rx="2.8" ry="2.2" fill={INK} />
    <ellipse cx="44" cy="47" rx="3.6" ry="2.2" fill="#f4b6c2" opacity="0.85" />
    <ellipse cx="70" cy="47" rx="3.6" ry="2.2" fill="#f4b6c2" opacity="0.85" />
    <path d="M46 62 c7 4 15 4 22 0 l1.6 4.6 c-8 4.6 -17 4.6 -25 0 z" fill="#d0453c" stroke={INK} strokeWidth="0.9" />
    <circle cx="57" cy="67" r="2.8" fill="#f6d26b" stroke={INK} strokeWidth="0.9" />
  </Shell>
);

const Disco: React.FC = () => (
  <Shell>
    <defs>
      <linearGradient id="tDisco" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#8b6fc0" />
        <stop offset="60%" stopColor="#b07ac9" />
        <stop offset="100%" stopColor="#a45fb0" />
      </linearGradient>
      <linearGradient id="tRay" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect width={BOX.w} height={BOX.h} fill="url(#tDisco)" />
    <g opacity="0.5">
      <path d="M57 12 L6 62 L26 62 Z" fill="url(#tRay)" />
      <path d="M57 12 L88 62 L108 62 Z" fill="url(#tRay)" />
    </g>
    <path d="M57 0 v8" stroke={INK} strokeWidth="1.1" />
    <circle cx="57" cy="17" r="8" fill="#e6e2ee" stroke={INK} strokeWidth="1.1" />
    <g stroke="#9b94ae" strokeWidth="0.6">
      <path d="M50 13 h14 M49 17 h16 M50 21 h14" />
      <path d="M53 9 v16 M57 9 v17 M61 9 v16" />
    </g>
    <path d="M0 56 H113 V79 H0 Z" fill="#2b2350" />
    <g opacity="0.9">
      <path d="M0 58 h29 v8 H0 z" fill="#4a3f86" />
      <path d="M29 58 h28 v8 H29 z" fill="#f0a9c8" />
      <path d="M57 58 h29 v8 H57 z" fill="#5ecfd0" />
      <path d="M86 58 h27 v8 H86 z" fill="#4a3f86" />
      <path d="M0 66 h18 v13 H0 z" fill="#5ecfd0" />
      <path d="M18 66 h39 v13 H18 z" fill="#4a3f86" />
      <path d="M57 66 h39 v13 H57 z" fill="#f0a9c8" />
      <path d="M96 66 h17 v13 H96 z" fill="#5ecfd0" />
    </g>
    <g stroke="#fff8d8" strokeWidth="1" strokeLinecap="round">
      <path d="M22 28 v5 M19.5 30.5 h5" />
      <path d="M92 34 v4.5 M89.8 36.2 h4.5" />
    </g>
  </Shell>
);

export type ThumbArtId = "night" | "ramen" | "corgi" | "disco";

export const ThumbArt: React.FC<{ art: ThumbArtId }> = ({ art }) => {
  switch (art) {
    case "night":
      return <Night />;
    case "corgi":
      return <Corgi />;
    case "disco":
      return <Disco />;
    default:
      return <Ramen />;
  }
};
