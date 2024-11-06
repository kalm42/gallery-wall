import shuffle from "./shuffle";
import { Frame, Grid } from "./types";

export type AssignFramesToGridOptions = {
    frames: Frame[];
    grid: Grid;
    rows: number;
    columns: number;
}
export type Position = { row: number; column: number; };
const assignFramesToGrid = (options: AssignFramesToGridOptions): Grid => {
    const { frames, grid, rows, columns } = options;

    const assignedGrid = JSON.parse(JSON.stringify(grid));
    const positions: Position[] = [];

    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < Math.ceil(columns / 2); column++) {
            positions.push({ row, column });
        }
    }

    const shuffledFrames = shuffle(frames);

    let frameIndex = 0;
    for (const position of positions) {
        if (frameIndex >= shuffledFrames.length) break;
        
        assignedGrid[position.row][position.column] = shuffledFrames[frameIndex];
        frameIndex++;
        
        // Now the opposite one
        const oppositeColumn = columns - 1 - position.column;
        if (oppositeColumn === position.column) continue;
        if (frameIndex >= shuffledFrames.length) break;

        assignedGrid[position.row][oppositeColumn] = shuffledFrames[frameIndex];
        frameIndex++;
    }

    return assignedGrid;
}

export default assignFramesToGrid;