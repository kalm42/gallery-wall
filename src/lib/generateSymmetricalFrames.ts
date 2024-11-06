import { nanoid } from "nanoid";
import getLargestFrameSize from "./getLargestFrameSize";
import { DefinedLayout, Frame, FrameSize, standardFrameDimensions } from "./types";

type GenerateSymmetricalFramesOptions = {
    pieceCount: number;
    wallWidth: number;
    wallHeight: number;
    existingFrames?: Frame[];
    minGap?: number;
    maxGap?: number;
  }
  
  const generateSymmetricalFrames = (options: GenerateSymmetricalFramesOptions): DefinedLayout => {
    const { pieceCount, wallWidth, wallHeight, existingFrames = [], minGap = 2, maxGap = 4 } = options;
  
    const additionalFramesNeeded = pieceCount - existingFrames.length;
    if (additionalFramesNeeded <= 0) return {  frames: existingFrames, gap: minGap };
  
    const standardSizes = [...standardFrameDimensions];
    // Add any frames sizes in the existing frames set that are not currently in the standard frame sizes set
    existingFrames.forEach((frame) => {
      const check = (standard: FrameSize) => standard.width === frame.width && standard.height === frame.height
      if (!standardSizes.some(check)) {
        standardSizes.push({ width: frame.width, height: frame.height });
      }
    });
  
    // Get the largest possible frame size that fits
    const largestSize = getLargestFrameSize({ wallWidth, wallHeight, pieceCount, minGap, maxGap, standardFrames: standardSizes });
    if (!largestSize) throw new Error("No frame size fits, get rekt");
  
    // Add the additional frames needed
    const additionalFrames: Frame[] = [];
    for (let i = 0; i < additionalFramesNeeded; i++) {
      // Choose a size that matches existing frames or standard sizes
      const size = largestSize.size;
      additionalFrames.push({
        id: nanoid(),
        width: size.width,
        height: size.height,
        top: 0,
        left: 0,
        position: { row: 0, column: 0 }
      });
    }
  
    // Merge the existing frames with the additional frames
    const frames: Frame[] = [...existingFrames, ...additionalFrames];
    return { frames, gap: largestSize.gap };
  };

  export default generateSymmetricalFrames;