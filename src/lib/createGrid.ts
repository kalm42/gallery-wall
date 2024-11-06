import { Frame } from "./types";

/**
 * Creates a 2D grid with the given number of columns and rows, initializing each cell to null.
 *
 * @example
 * const grid = createGrid(3, 2);
 */
const createGrid = (columns: number, rows: number): (Frame | null)[][] => Array.from({ length: columns }, () => Array.from({ length: rows }, () => null));

export default createGrid;