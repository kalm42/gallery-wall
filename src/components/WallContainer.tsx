"use client";

import React, { useEffect, useRef, useState } from "react";
import Wall from "./Wall";

interface WallContainerProps {
  width: number;
  height: number;
  children: React.ReactNode;
  scale: number;
  setScale: (scale: number) => void;
}

const WallContainer = (props: WallContainerProps) => {
  const { width = 96, height = 96, children, scale, setScale } = props;
  const wallContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1);
  const [containerHeight, setContainerHeight] = useState(1);

  // Get the width and height of the wall container
  useEffect(() => {
    const updateDimensions = () => {
      if (wallContainerRef.current) {
        const { width, height } =
          wallContainerRef.current.getBoundingClientRect();
        setContainerWidth(width);
        setContainerHeight(height);
      }
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Calculate the scale of the wall
  useEffect(() => {
    if (containerHeight && containerWidth) {
      const widthScale = containerWidth / width;
      const heightScale = containerHeight / height;
      const newScale = Math.min(widthScale, heightScale);
      setScale(newScale);
    }
  }, [containerHeight, containerWidth, height, setScale, width]);

  return (
    <div
      ref={wallContainerRef}
      className="w-full h-full flex-grow max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl mx-auto"
    >
      <Wall width={width} height={height} scale={scale}>
        {/* Frames will go here */}
        {children}
      </Wall>
    </div>
  );
};

export default WallContainer;
