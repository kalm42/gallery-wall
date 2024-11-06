import { DefinedLayout, Frame, Layout, layoutSchema } from "./types";
import generateSymmetricalFrames from "./generateSymmetricalFrames";

type GenerateFramesOptions = {
  layout: Layout;
  pieceCount: number;
  wallWidth: number;
  wallHeight: number;
  existingFrames: Frame[];
};

export const generateFrames = (options: GenerateFramesOptions): DefinedLayout => {
  const { layout, pieceCount, wallWidth, wallHeight, existingFrames } = options;

  if (layout === layoutSchema.Enum.symmetrical) {
    return generateSymmetricalFrames({ pieceCount, wallWidth, wallHeight, existingFrames });
  }

  //   if (layout === layoutSchema.Enum.asymmetrical) {
  //     return generateAsymmetricalFrames(pieceCount, wallWidth, wallHeight);
  //   }
    
  //   if (layout === layoutSchema.Enum.focalPoint) {
  //     return generateFocalPointFrames(pieceCount, wallWidth, wallHeight);
  //   }
  return { columns: 0, rows: 0, gap: 0, layout: [] };
};

