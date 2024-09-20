import {
  Frame,
  Layout,
  layoutSchema,
  standardFrameDimensions,
} from "@/app/page";
import { nanoid } from "nanoid";

export const generateFrames = (
  layout: Layout,
  pieceCount: number,
  wallWidth: number,
  wallHeight: number,
  existingFrames: Frame[]
) => {
  if (layout === layoutSchema.Enum.symmetrical) {
    return generateSymmetricalFrames(
      pieceCount,
      wallWidth,
      wallHeight,
      existingFrames
    );
  }

  //   if (layout === layoutSchema.Enum.asymmetrical) {
  //     return generateAsymmetricalFrames(pieceCount, wallWidth, wallHeight);
  //   }

  //   if (layout === layoutSchema.Enum.focalPoint) {
  //     return generateFocalPointFrames(pieceCount, wallWidth, wallHeight);
  //   }
};

const generateSymmetricalFrames = (
  pieceCount: number,
  wallWidth: number,
  wallHeight: number,
  existingFrames: Frame[] = [],
  minGap = 2,
  maxGap = 4
) => {
  const MAX_AREA = wallWidth * wallHeight * 0.8;
  // Gaps
  const gapOptions = [];
  for (let i = minGap; i <= maxGap; i += 0.25) {
    gapOptions.push(i);
  }

  // Frame boundaries
  const SMALLEST_FRAME_WIDTH = standardFrameDimensions.reduce(
    (acc, frame) => Math.min(acc, frame.width),
    Infinity
  );
  const SMALLEST_FRAME_HEIGHT = standardFrameDimensions.reduce(
    (acc, frame) => Math.min(acc, frame.height),
    Infinity
  );
  const LARGEST_FRAME_WIDTH = standardFrameDimensions.reduce(
    (acc, frame) => Math.max(acc, frame.width),
    0
  );
  const LARGEST_FRAME_HEIGHT = standardFrameDimensions.reduce(
    (acc, frame) => Math.max(acc, frame.height),
    0
  );
  // Column and row boundaries
  const MAX_COLUMNS = Math.floor(wallWidth / (SMALLEST_FRAME_WIDTH + minGap));
  const MIN_COLUMNS = Math.floor(wallWidth / (LARGEST_FRAME_WIDTH + maxGap));
  const MAX_ROWS = Math.floor(wallHeight / (SMALLEST_FRAME_HEIGHT + minGap));
  const MIN_ROWS = Math.floor(wallHeight / (LARGEST_FRAME_HEIGHT + maxGap));

  // Kick it off
  let bestConfiguration = null;
  for (let rows = MIN_ROWS; rows < MAX_ROWS; rows++) {
    for (let columns = MIN_COLUMNS; columns < MAX_COLUMNS; columns++) {
      const totalFramesNeeded = rows * columns;

      if (totalFramesNeeded < existingFrames.length) continue;

      // Iterate over gaps
      for (const gap of gapOptions) {
        // iterate over frame sizes
        for (const frame of standardFrameDimensions) {
          const { width, height } = frame;

          // Total required width and height including gaps
          const totalFramesWidth = columns * width + (columns - 1) * gap;
          const totalFramesHeight = rows * height + (rows - 1) * gap;

          // Check if frames fit within wall dimensions
          if (totalFramesWidth > wallWidth || totalFramesHeight > wallHeight) {
            continue; // Frames do not fit horizontally or vertically
          }

          // Calculate total frame area
          const totalFrameArea = totalFramesNeeded * width * height;

          // Check if total frame area exceeds 80% of wall area
          if (totalFrameArea > MAX_AREA) {
            continue;
          }

          // We have a valid configuration
          const configuration = {
            rows,
            columns,
            width,
            height,
            gap,
            totalFramesNeeded,
            totalFrameArea,
          };

          if (!bestConfiguration) {
            bestConfiguration = configuration;
          } else {
            // If these frames are bigger that the current best configuration's frames
            if (
              width * height >
              bestConfiguration.width * bestConfiguration.height
            ) {
              bestConfiguration = configuration;
            } else if (
              // If these frames are the same size as the current best configuration's frames
              // but require more frames
              width * height ===
                bestConfiguration.width * bestConfiguration.height &&
              totalFramesNeeded > bestConfiguration.totalFramesNeeded
            ) {
              bestConfiguration = configuration;
            }
          }
        }
      }
    }
  }

  if (!bestConfiguration) return existingFrames;

  const frames: Frame[] = [];
  for (let i = 0; i < bestConfiguration.totalFramesNeeded; i++) {
    const frame: Frame = {
      id: nanoid(),
      height: bestConfiguration.height,
      width: bestConfiguration.width,
      top: 0,
      left: 0,
    };
    frames.push(frame);
  }

  return frames;
};
