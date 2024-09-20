import React from "react";

interface FrameProps {
  width: number;
  height: number;
  top: number;
  left: number;
  scale: number;
}

const Frame = (props: FrameProps) => {
  const { width, height, top, left, scale } = props;
  return (
    <div
      className="absolute border rounded bg-emerald-400 dark:bg-emerald-700"
      style={{
        width: `${width * scale}px`,
        height: `${height * scale}px`,
        top: `${top * scale}px`,
        left: `${left * scale}px`,
      }}
    />
  );
};

export default Frame;
