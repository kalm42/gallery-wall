"use client";

import React, { useRef } from "react";

interface WallProps {
  width: number; // in inches
  height: number; // in inches
  scale: number; // in pixels per inch
  children: React.ReactNode;
}

const Wall = (props: WallProps) => {
  const { width, height, scale, children } = props;
  const wallRef = useRef(null);

  return (
    <div
      ref={wallRef}
      className="bg-slate-300 border border-black dark:bg-slate-800 mx-auto relative"
      style={{
        width: `${width * scale}px`,
        height: `${height * scale}px`,
      }}
    >
      {children}
    </div>
  );
};

export default Wall;
