import { Grid } from "./types";

const calculateDimensions = (grid: Grid, rows: number, columns: number) => {
    const columnWidths = Array.from({ length: columns }, () => 0);
    const rowHeights = Array.from({ length: rows }, () => 0);

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const frame = grid[row][col];
            if (frame === null) continue;        

            rowHeights[row] = Math.max(rowHeights[row], frame.height);
            columnWidths[col] = Math.max(columnWidths[col], frame.width);
        }
    }

    return { columnWidths, rowHeights };
}

export default calculateDimensions;