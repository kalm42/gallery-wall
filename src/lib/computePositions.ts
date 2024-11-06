import { Frame, Grid } from "./types";

type ComputePositionsOptions = {
    grid: Grid; 
    columnWidths: number[]; 
    rowHeights: number[]; 
    wallHeight: number; 
    wallWidth: number; 
    gap: number; 
}

const computePositions = (options: ComputePositionsOptions): Frame[] => {
    const { grid, columnWidths, rowHeights, wallHeight, wallWidth, gap } = options;

    const columns = columnWidths.length;
    const rows = rowHeights.length;

    const totalWidth = columnWidths.reduce((summ, width) => summ + width, 0) + (columns - 1) * gap;
    const totalHeight = rowHeights.reduce((summ, height) => summ + height, 0) + (rows - 1) * gap;

    const startX = (wallWidth - totalWidth) / 2; //Left most point of the grid
    const startY = (wallHeight - totalHeight) / 2; //Top most point of the grid

    const positionedFrames: Frame[] = [];
    let y = startY;
    for (let row = 0; row < rows; row++) {
        let x = startX;
        for (let col = 0; col < columns; col++) {
            const frame = JSON.parse(JSON.stringify(grid[row][col]));
            if (frame === null) {
                x += columnWidths[col] + gap;
                continue;
            }

            // Calculate the left padding to center the frame in the column
            const offsetX = (columnWidths[col] - frame.width) / 2
            // Calculate the top padding to center the frame in the row;
            const offsetY = (rowHeights[row] - frame.height) / 2;

            frame.top = y + offsetY;
            frame.left = x + offsetX;
            frame.position = { row, column: col };
            positionedFrames.push(frame);

            // Move to the next column
            x += columnWidths[col] + gap;
        }
        // Move to the next row
        y += rowHeights[row] + gap;
    }

    return positionedFrames;
};

export default computePositions;