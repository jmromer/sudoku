import { GRID, N, INDEX, COORD } from 'typings'

import shuffle from 'utils/shuffle'

// Is the target value `value` in row `rowIndex` of grid `grid`?
function isInRow(value: N, grid: GRID, rowIndex: INDEX): boolean {
    return grid[rowIndex].includes(value)
}

// Is the value `value` in column `colIndex` of grid `grid`?
function isInCol(value: N, grid: GRID, colIndex: INDEX): boolean {
    for (let row = 0; row < grid.length; row++) {
        if (grid[row][colIndex] === value) { return true }
    }
    return false
}

// Return a list of coordinates (index pairs) for the enclosing sub-grid of grid
// coordinate [`row`, `col`].
function subGridIndexes(row: INDEX, col: INDEX): COORD[] {
    const lowerBound = (n: INDEX): INDEX => (n < 3) ? 0 : (n > 5) ? 6 : 3
    const baseRow: INDEX = lowerBound(row)
    const baseCol: INDEX = lowerBound(col)

    const indices =
        [...Array(3)].map((_, i): COORD[] =>
            [...Array(3)].map((_, j): COORD =>
                [<INDEX>(baseRow + i), <INDEX>(baseCol + j)]
            ))

    return Array().concat(...indices)
}

// Is the target value `target` in the neighborhood of
// [`rowIndex`, `colIndex`] (i.e., in its enclosing sub-grid) of grid `grid`?
function isInSubGrid(value: N, grid: GRID, rowIndex: INDEX, colIndex: INDEX): boolean {
    const coords = subGridIndexes(rowIndex, colIndex)

    for (let [row, col] of coords) {
        if (grid[row][col] === value) {
            return true
        }
    }

    return false
}


// Is the given `grid` completely filled?
function isValidInPosition(value: N, grid: GRID, rowIndex: INDEX, colIndex: INDEX): boolean {
    return !isInRow(value, grid, rowIndex)
        && !isInCol(value, grid, colIndex)
        && !isInSubGrid(value, grid, rowIndex, colIndex)
}

/**
 * Is the given `grid` completely filled?
 *
 * @param {GRID} grid - a 9 x 9 sudoku grid
 * @returns {Boolean} true if the grid is filled
 */
export function isFullGrid(grid: GRID): boolean {
    return !Array().concat(...grid).includes(0)
}

/**
 * Fill the given `grid` with values in accordance with sudoku rules
 *
 * @param {GRID} grid - a 9 x 9 sudoku grid
 * @returns {Boolean} true if a valid placement has been made, else false
 */
export default function fillGrid(grid: GRID): boolean {
    const values: NUMBERS[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const size = 9

    let row = 0
    let col = 0

    for (let i = 0; i < size ** 2; i++) {
        row = Math.floor(i / size)
        col = i % size

        // Skip if the position is filled already
        if (grid[row][col] !== 0) { continue }

        shuffle(values)

        for (let value of values) {
            if (isValidInPosition(value, grid, row, col)) {
                grid[row][col] = value

                if (isFullGrid(grid)) {
                    return true
                } else if (fillGrid(grid)) {
                    return true
                }
            }
        }

        break
    }

    // reset to 0 if we fail to populate [row, col]
    grid[row][col] = 0
    return false
}
