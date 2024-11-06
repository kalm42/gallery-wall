import { FrameSize } from "./types";

export type GetLargestFrameSizeOptions = {
    standardFrames: FrameSize[]; // to choose from
    wallWidth: number;
    wallHeight: number;
    minGap?: number;
    maxGap?: number;
    pieceCount: number;
  }

const getLargestFrameSize = (options: GetLargestFrameSizeOptions): { size: FrameSize; gap: number; } | null => {
  const {
    standardFrames, wallWidth, wallHeight, minGap = 2, maxGap = 4, pieceCount
  } = options;
  // Generate possible grid configurations from 1 row with ALL the frames to 1 column with ALL the frames
  const configurations = [];
  for (let rows = 1; rows <= pieceCount; rows++) {
    if (pieceCount % rows === 0) {
      const columns = pieceCount / rows;
      configurations.push({ rows, columns });
    }
  }

  // Sort standard sizes in descending order (largest first)
  const sortedSizes = [...standardFrames].sort(
    // b area - a area, if b is larger than a, b will come first
    (a, b) => b.width * b.height - a.width * a.height
  );

  // Try EVERY standard size in EVERY configuration
  for (const size of sortedSizes) {
    const { width, height } = size;

    // Try EVERY configuration
    for (const config of configurations) {
      const { rows, columns } = config;

      // Find a gap size within the min and max gap
      for (let gap = maxGap; gap >= minGap; gap -= 0.25) {
        // Calculate the frame width and height
        const totalFramedWidth = columns * width + (columns - 1) * gap;
        const totalFramedHeight = rows * height + (rows - 1) * gap;

        // Check if the total framed width, height, and area fit within the wall width and height
        if (totalFramedWidth <= wallWidth && totalFramedHeight <= wallHeight) {
          return { size, gap }; // By going down
        }
      }
    }
  }

  // If no size fits, return null
  return null;
};

export default getLargestFrameSize;