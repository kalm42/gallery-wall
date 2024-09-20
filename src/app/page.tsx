"use client";

import Doc from "@/components/Doc";
import Frame from "@/components/Frame";
import FrameManager from "@/components/FrameManager";
import LayoutSelector from "@/components/LayoutSelector";
import PieceCount from "@/components/PieceCount";
import WallContainer from "@/components/WallContainer";
import WallSizeControls from "@/components/WallSizeControls";
import { useState } from "react";
import { z } from "zod";

export const standardFrameDimensions = [
  { width: 8, height: 10 },
  { width: 11, height: 14 },
  { width: 16, height: 20 },
  { width: 18, height: 24 },
  { width: 24, height: 36 },
];
export const frameSchema = z.object({
  id: z.string().nanoid(),
  width: z.number(),
  height: z.number(),
  top: z.number(),
  left: z.number(),
});
export type Frame = z.infer<typeof frameSchema>;
export const framesSchema = z.array(frameSchema);
export type Frames = z.infer<typeof framesSchema>;
export const layoutSchema = z.enum([
  "symmetrical",
  "asymmetrical",
  "focalPoint",
]);
export type Layout = z.infer<typeof layoutSchema>;

export default function Home() {
  const [scale, setScale] = useState(1);
  const [open, setOpen] = useState(false);
  const [wallHeight, setWallHeight] = useState(96);
  const [wallWidth, setWallWidth] = useState(96);
  const [layout, setLayout] = useState<Layout>("symmetrical");
  const [frames, setFrames] = useState<Frames>([]);
  const [pieceCount, setPieceCount] = useState(0);

  return (
    <div className="w-full min-h-screen">
      <main className="min-h-screen flex flex-col">
        <h1>Plan a gallery wall</h1>
        <WallContainer
          scale={scale}
          setScale={setScale}
          height={wallHeight}
          width={wallWidth}
        >
          {frames.map((frame) => (
            <Frame key={frame.id} scale={scale} {...frame} />
          ))}
        </WallContainer>
        <Doc isOpen={open} toggle={() => setOpen((prev) => !prev)}>
          <WallSizeControls
            setWallHeight={setWallHeight}
            setWallWidth={setWallWidth}
            wallHeight={wallHeight}
            wallWidth={wallWidth}
          />
          <FrameManager frames={frames} setFrames={setFrames} />
          <LayoutSelector layout={layout} setLayout={setLayout} />
          <PieceCount pieceCount={pieceCount} setPieceCount={setPieceCount} />
        </Doc>
      </main>
      <footer>
        <p>Made by me, Kyle</p>
      </footer>
    </div>
  );
}
