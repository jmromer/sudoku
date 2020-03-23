import {
    COORD,
    GRID,
    INDEX,
    ROW,
    SUDOKU_GRID_SIZE,
    VALUE
} from 'typings'

import shuffle from 'utils/shuffle'

// Is the target value `value` in row `rowIndex` of grid `grid`?
function isInRow(value: VALUE, grid: GRID, rowIndex: INDEX): boolean {
    return grid[rowIndex].includes(value)
}

// Is the value `value` in column `colIndex` of grid `grid`?
function isInCol(value: VALUE, grid: GRID, colIndex: INDEX): boolean {
    for (let row = 0; row < grid.length; row++) {
        if (grid[row][colIndex] === value) { return true }
    }
    return false
}

// Return a list of coordinates (index pairs) for the enclosing sub-grid of grid
// coordinate [`row`, `col`].
function subGridIndexes(row: INDEX, col: INDEX): COORD[] {
    const lowerBound = (n: INDEX): INDEX => (n < 3) ? 0 : (n > 5) ? 6 : 3
    const baseCoords: COORD = [lowerBound(row), lowerBound(col)]
    return adjacentSubgridCoords(...baseCoords)
}

// Given the "base" coordinates of a subgrid (i.e., the row and column of the
// subgrid's origin), return an array of COORD pairs for all the cells in that
// subgrid.
function adjacentSubgridCoords(row: INDEX, col: INDEX): COORD[] {
    return [
        [row + 0, col + 0], [row + 0, col + 1], [row + 0, col + 2],
        [row + 1, col + 0], [row + 1, col + 1], [row + 1, col + 2],
        [row + 2, col + 0], [row + 2, col + 1], [row + 2, col + 2],
    ] as COORD[]
}

// Return a list of COORD lists, each containing the coordinates of a
// sudoku board subgrid.
function allSubgridIndexes(): COORD[][] {
    const subgridOriginCoords: COORD[] = [
        [0, 0], [0, 3], [0, 6],
        [3, 0], [3, 3], [3, 6],
        [6, 0], [6, 3], [6, 6],
    ] as COORD[]
    return subgridOriginCoords.map(coords => adjacentSubgridCoords(...coords))
}

// Is the target value `target` in the neighborhood of
// [`rowIndex`, `colIndex`] (i.e., in its enclosing sub-grid) of grid `grid`?
function isInSubGrid(value: VALUE, grid: GRID, rowIndex: INDEX, colIndex: INDEX): boolean {
    const subgridCoords = subGridIndexes(rowIndex, colIndex)
    const subgridValues = subgridCoords.map(([row, col]) => grid[row][col])
    return subgridValues.includes(value)
}

// Is the given `grid` completely filled?
function isValidInPosition(value: VALUE, grid: GRID, rowIndex: INDEX, colIndex: INDEX): boolean {
    return !isInRow(value, grid, rowIndex)
        && !isInCol(value, grid, colIndex)
        && !isInSubGrid(value, grid, rowIndex, colIndex)
}

// Are the given arrays equivalent by value?
function equalArrays(arr1: VALUE[], arr2: VALUE[]): boolean {
    return arr1.length === arr2.length
        && arr1.every((value, index) => value === arr2[index])
}

/**
 * Is the given `grid` completely filled?
 *
 * @param {GRID} grid - a 9 x 9 sudoku grid
 * @returns {Boolean} true if the grid is filled
 */
export function isFullGrid(grid: GRID): boolean {
    const values: VALUE[] = []
    return !values.concat(...grid).includes(0)
}

/**
 * Is the given `grid` validly filled?
 *
 * @param {GRID} grid - a 9 x 9 sudoku grid
 * @returns {Boolean} true if the grid is valid
 */
export function isValidGrid(grid: GRID): boolean {
    if (!isFullGrid(grid)) { return false }

    const completeEntries: VALUE[] =
        [...Array(SUDOKU_GRID_SIZE)].map((_, i) => i + 1 as VALUE)

    for (let row of grid) {
        const rowEntries = row.slice(0).sort()
        if (!equalArrays(rowEntries, completeEntries)) { return false }
    }

    for (let col = 0; col < SUDOKU_GRID_SIZE; col++) {
        let colEntries = [...Array(SUDOKU_GRID_SIZE)].map((_, row) => grid[row][col]).sort()
        if (!equalArrays(colEntries, completeEntries)) { return false }
    }

    const subgrids = allSubgridIndexes()
    for (let subgrid of subgrids) {
        let subgridEntries = subgrid.map(([row, col]) => grid[row][col]).sort()
        if (!equalArrays(subgridEntries, completeEntries)) { return false }
    }

    return true
}

/**
 * Fill the given `grid` with values in accordance with sudoku rules
 *
 * @param {GRID} grid - a 9 x 9 sudoku grid
 * @returns {Boolean} true if a valid placement has been made, else false
 */
export default function fillGrid(grid: GRID): boolean {
    const values: VALUE[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let row: INDEX = 0
    let col: INDEX = 0

    for (let i = 0; i < SUDOKU_GRID_SIZE ** 2; i++) {
        row = Math.floor(i / SUDOKU_GRID_SIZE) as INDEX
        col = i % SUDOKU_GRID_SIZE as INDEX

        if (grid[row][col] === 0) {
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
    }

    // reset to 0 if we fail to populate [row, col]
    grid[row][col] = 0
    return false
}


/**
 * Return a validly filled sudoku grid
 *
 * @returns {GRID}
 */
export function FilledGrid(): GRID {
    const grid: GRID =
        [...Array(SUDOKU_GRID_SIZE)].map(_ =>
            [...Array(SUDOKU_GRID_SIZE)].map(_ =>
                0 as VALUE
            ) as ROW
        ) as GRID

    fillGrid(grid)

    return grid
}
