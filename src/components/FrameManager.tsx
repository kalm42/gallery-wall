import { Frame } from "@/app/page";
import cn from "classnames";
import React from "react";

interface FrameManagerProps {
  frames: Frame[];
  setFrames: (frames: Frame[]) => void;
}

const FrameManager = (props: FrameManagerProps) => {
  const { frames, setFrames } = props;

  //   const addFrame = () => {};

  const removeFrame = (id: string) => {
    setFrames(frames.filter((frame) => frame.id !== id));
  };

  return (
    <div className="px-4 py-8 mb-4 shadow-lg">
      <h3 className="font-semibold text-lg tracking-tight pb-2">
        Manage Frames
      </h3>
      <button className="bg-slate-300 dark:bg-slate-900 rounded-md p-2">
        Add frame
      </button>
      <ul className={cn({ hidden: frames.length < 1 })}>
        {frames.map((frame) => (
          <li
            key={frame.id}
            className="flex items-center border-b border-slate-300 dark:border-slate-600/25 p-2"
          >
            <p className="flex-1">
              {frame.width} x {frame.height} Frame
            </p>
            <button
              className="bg-slate-300 dark:bg-slate-900 rounded-md p-2"
              onClick={() => removeFrame(frame.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FrameManager;
