import { z } from "zod";

export const standardFrameDimensions: FrameSize[] = [
    { width: 8, height: 10 },
    { width: 11, height: 14 },
    { width: 16, height: 20 },
    { width: 18, height: 24 },
    { width: 24, height: 36 },
  ];

  export const frameSizeSchema = z.object({
    width: z.number(),
    height: z.number(),
  });
  export type FrameSize = z.infer<typeof frameSizeSchema>;

export const frameSchema = z.object({
    id: z.string().nanoid(),
    width: z.number(),
    height: z.number(),
    top: z.number(),
    left: z.number(),
    position: z.object({
      row: z.number().int(),
      column: z.number().int(),
    }),
  });
  export type Frame = z.infer<typeof frameSchema>;
  export const framesSchema = z.array(frameSchema);
  export type Frames = z.infer<typeof framesSchema>;
  export const layoutSchema = z.enum([
    "symmetrical",
    "asymmetrical",
    "focalPoint",
  ]);
  export type Layout = z.infer<typeof layoutSchema>;
  export const Layouts = layoutSchema.Enum;

export const positionSchema = z.object({
  row: z.number().int(),
  column: z.number().int(),
});
export type Position = z.infer<typeof positionSchema>;

export const assignedFrameSchema = frameSchema.extend({
  position: positionSchema,
});

export type AssignedFrame = z.infer<typeof assignedFrameSchema>;

export const definedLayoutSchema = z.object({
  layout: z.array(assignedFrameSchema),
  rows: z.number().int(),
  columns: z.number().int(),
  gap: z.number(),
});

export type DefinedLayout = z.infer<typeof definedLayoutSchema>;

export type Grid = (Frame | null)[][];