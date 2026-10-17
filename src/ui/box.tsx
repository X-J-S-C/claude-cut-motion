import React from "react";
import { rnd } from "../anim";
import { FONT_UI, INK } from "../theme";

/** Absolutely positioned box in canvas px (all layout is explicit, no flex). */
export const Abs: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  r?: number;
  fill?: string;
  stroke?: string;
  sw?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ x, y, w, h, r = 0, fill = "transparent", stroke, sw = 2, style, children }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: h,
      borderRadius: r,
      background: fill,
      border: stroke ? `${sw}px solid ${stroke}` : undefined,
      boxSizing: "border-box",
      ...style,
    }}
  >
    {children}
  </div>
);

/** Text laid out at an explicit canvas position. */
export const Txt: React.FC<{
  x: number;
  y: number;
  w?: number;
  size: number;
  color?: string;
  align?: "left" | "center" | "right";
  weight?: number;
  font?: string;
  rotate?: number;
  letter?: number;
  opacity?: number;
  /** vertical offset applied to the box so `y` behaves like a text centre */
  mid?: boolean;
  strokeColor?: string;
  strokeW?: number;
  shadow?: string;
  nowrap?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({
  x,
  y,
  w,
  size,
  color = INK,
  align = "left",
  weight = 400,
  font,
  rotate,
  letter,
  opacity = 1,
  mid = false,
  strokeColor,
  strokeW,
  shadow,
  nowrap = true,
  children,
  style,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: mid ? y - size * 0.62 : y,
      width: w,
      height: size * 1.35,
      fontFamily: font,
      fontSize: size,
      fontWeight: weight,
      color,
      textAlign: align,
      lineHeight: `${size * 1.35}px`,
      whiteSpace: nowrap ? "nowrap" : "normal",
      letterSpacing: letter ? `${letter}px` : undefined,
      opacity,
      transform: rotate ? `rotate(${rotate}deg)` : undefined,
      transformOrigin: align === "center" ? "center center" : align === "right" ? "right center" : "left center",
      WebkitTextStroke: strokeColor && strokeW ? `${strokeW}px ${strokeColor}` : undefined,
      paintOrder: strokeColor ? "stroke fill" : undefined,
      textShadow: shadow,
      ...style,
    }}
  >
    {children}
  </div>
);

/** Deterministic ±1.5 px / ±0.6° hand-drawn wobble for element `seed`. */
export const wobble = (seed: number) => {
  const dx = (rnd(seed) - 0.5) * 3;
  const dy = (rnd(seed + 11) - 0.5) * 3;
  const rot = (rnd(seed + 23) - 0.5) * 1.2;
  return { transform: `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px) rotate(${rot.toFixed(2)}deg)` };
};

export const UIFont = FONT_UI;
