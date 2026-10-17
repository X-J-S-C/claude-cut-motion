import React from "react";
import { Composition } from "remotion";
import { Motion } from "./Motion";
import { DESIGN_HEIGHT, DESIGN_WIDTH, FPS, TOTAL_FRAMES } from "./beats";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ClaudeCutMotion"
      component={Motion}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={DESIGN_WIDTH * 1.5}
      height={DESIGN_HEIGHT * 1.5}
    />
  );
};
