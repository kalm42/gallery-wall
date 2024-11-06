import assignFramesToGrid from "./assignFramesToGrid";
import calculateDimensions from "./calculateDimensions";
import computePositions from "./computePositions";
import createGrid from "./createGrid";
import { generateFrames } from "./generateFrames";
import { DefinedLayout, Frame, Layout, Layouts } from "./types";

export const generateLayout = (
  layout: Layout,
  pieceCount: number,
  wallWidth: number,
  wallHeight: number,
  existingFrames: Frame[]
) => {
  const { frames, gap } = generateFrames({
    layout,
    pieceCount,
    wallWidth,
    wallHeight,
    existingFrames
  });

  const placedFrames = arrangeFrames(layout, { columns: 0, rows: 0, gap, layout: frames }, wallWidth, wallHeight);
  return placedFrames;
};

const arrangeFrames = (
  layout: Layout,
  frames: DefinedLayout,
  wallWidth: number,
  wallHeight: number
): DefinedLayout => {
  switch (layout) {
    case Layouts.symmetrical:
      return arrangeFramesSymmetrically(frames, wallWidth, wallHeight);
    case Layouts.asymmetrical:
    case Layouts.focalPoint:
      throw new Error("Not implemented yet");

    default:
      throw new Error("Invalid layout");
  }
};

const arrangeFramesSymmetrically = ( frames: DefinedLayout, wallWidth: number, wallHeight: number): DefinedLayout => {
    const grid = createGrid(frames.columns, frames.rows);
    const layout = assignFramesToGrid({ frames: frames.layout, grid, columns: frames.columns, rows: frames.rows })
    const { columnWidths, rowHeights } = calculateDimensions(grid, frames.rows, frames.columns);
    const positionedFrames = computePositions({
        columnWidths,
        rowHeights,
        gap: frames.gap,
        grid: layout,
        wallWidth,
        wallHeight,  
    })
    
    return {
        ...frames,
        layout: positionedFrames,
    };
};


