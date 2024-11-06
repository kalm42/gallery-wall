"use client";

import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Doc from "@/components/Doc";
import Frame from "@/components/Frame";
import FrameManager from "@/components/FrameManager";
import LayoutSelector from "@/components/LayoutSelector";
import PieceCount from "@/components/PieceCount";
import WallContainer from "@/components/WallContainer";
import WallSizeControls from "@/components/WallSizeControls";
import { Frames, Layout } from "@/lib/types";
// TODO! Missing { generateLayout } from "@/lib/generateLayout";
// TODO! Missing import { Frames, Layout } from "@/lib/types";

export default function Home() {
  const [scale, setScale] = useState(1);
  const [open, setOpen] = useState(false);
  const [wallHeight, setWallHeight] = useState(96);
  const [wallWidth, setWallWidth] = useState(96);
  const [layout, setLayout] = useState<Layout>("symmetrical");
  const [frames, setFrames] = useState<Frames>([]);
  const [pieceCount, setPieceCount] = useState(0);

  const handleClick = () => {
    const f = generateLayout(layout, pieceCount, wallWidth, wallHeight, frames);
    if (!f) return;
    const derivedFrames = f.layout.map((frame) => ({
      height: frame.height,
      id: nanoid(),
      left: frame.left,
      top: frame.top,
      width: frame.width,
    }));
    setFrames(derivedFrames);
  };

  // Keep piece count
  useEffect(() => {
    if (frames.length === 0) return;
    if (frames.length > pieceCount) {
      setPieceCount(frames.length);
    }
  }, [frames.length, pieceCount]);

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
          <button
            onClick={handleClick}
            className="m-2 py-4 px-10 rounded-md block bg-slate-300 dark:bg-slate-900"
          >
            Generate Layout
          </button>
        </Doc>
      </main>
      <footer>
        <p>Made by me, Kyle</p>
      </footer>
    </div>
  );
}
