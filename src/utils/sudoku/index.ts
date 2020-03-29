import {
    COORD,
    GRID,
    INDEX,
    ROW,
    VALUE
} from 'typings'

import array from '../array'

const GRID_SIZE = 9

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

// Is the target value `target` in the neighborhood of
// [`rowIndex`, `colIndex`] (i.e., in its enclosing sub-grid) of grid `grid`?
function isInSubgrid(value: VALUE, grid: GRID, rowIndex: INDEX, colIndex: INDEX): boolean {
    const subgridValues =
        subgridCoords(rowIndex, colIndex)
            .map(([row, col]) => grid[row][col])
    return subgridValues.includes(value)
}

// Return a list of coordinates (index pairs) for the enclosing sub-grid of grid
// coordinate [`row`, `col`].
function subgridCoords(row: INDEX, col: INDEX): COORD[] {
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
function allSubgridCoords(): COORD[][] {
    const subgridOriginCoords: COORD[] = [
        [0, 0], [0, 3], [0, 6],
        [3, 0], [3, 3], [3, 6],
        [6, 0], [6, 3], [6, 6],
    ] as COORD[]
    return subgridOriginCoords.map(coords => adjacentSubgridCoords(...coords))
}

// Is the given `value` valid in position `coords` of grid `grid`?
function isValidInPosition(value: VALUE, grid: GRID, coords: COORD): boolean {
    let [row, col] = coords
    return !isInRow(value, grid, row)
        && !isInCol(value, grid, col)
        && !isInSubgrid(value, grid, row, col)
}

/**
 * Is the given `grid` completely filled?
 *
 * @param {GRID} grid - a 9 x 9 sudoku grid
 * @returns {Boolean} true if the grid is filled
 */
function isFull(grid: GRID): boolean {
    const values: VALUE[] = []
    return !values.concat(...grid).includes(0)
}

/**
 * Is the given `grid` validly filled?
 *
 * @param {GRID} grid - a 9 x 9 sudoku grid
 * @returns {Boolean} true if the grid is valid
 */
function isValid(grid: GRID): boolean {
    if (!isFull(grid)) { return false }

    const completeEntries: VALUE[] =
        [...Array(GRID_SIZE)].map((_, i) => i + 1 as VALUE)

    for (let row of grid) {
        const rowEntries = row.slice(0).sort()
        if (!array.equal(rowEntries, completeEntries)) { return false }
    }

    for (let col = 0; col < GRID_SIZE; col++) {
        let colEntries = [...Array(GRID_SIZE)].map((_, row) => grid[row][col]).sort()
        if (!array.equal(colEntries, completeEntries)) { return false }
    }

    const subgrids = allSubgridCoords()
    for (let subgrid of subgrids) {
        let subgridEntries = subgrid.map(([row, col]) => grid[row][col]).sort()
        if (!array.equal(subgridEntries, completeEntries)) { return false }
    }

    return true
}

/**
 * Fill the given `grid` with values in accordance with sudoku rules
 *
 * @param {GRID} grid - a 9 x 9 sudoku grid
 * @returns {Boolean} true if a valid placement has been made, else false
 */
function fill(grid: GRID): boolean {
    const values: VALUE[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let row: INDEX = 0
    let col: INDEX = 0

    for (let i = 0; i < GRID_SIZE ** 2; i++) {
        row = Math.floor(i / GRID_SIZE) as INDEX
        col = i % GRID_SIZE as INDEX

        if (grid[row][col] === 0) {
            array.shuffle(values)

            for (let value of values) {
                if (isValidInPosition(value, grid, [row, col])) {
                    grid[row][col] = value

                    if (isFull(grid)) {
                        return true
                    } else if (fill(grid)) {
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
 * Return an empty sudoku grid.
 *
 * @returns {GRID}
 */
function empty(): GRID {
    return [...Array(GRID_SIZE)].map(_ =>
        [...Array(GRID_SIZE)].map(_ =>
            0 as VALUE
        ) as ROW
    ) as GRID
}

/**
 * Return a validly filled sudoku grid.
 *
 * @returns {GRID}
 */
function filled(): GRID {
    const grid: GRID = empty()
    fill(grid)
    return grid
}

const delta: Record<string, number[]> = {
    up: [-1, 0],
    down: [1, 0],
    left: [0, -1],
    right: [0, 1]
}

function move(direction: string, origin: COORD): COORD {
    const [row, col] = origin
    const [rowDelta, colDelta] = delta[direction] || [0, 0]
    const [targetRow, targetCol] = [row + rowDelta, col + colDelta] as COORD

    if (
        targetRow < 0 ||
        targetCol < 0 ||
        targetRow >= GRID_SIZE ||
        targetCol >= GRID_SIZE
    ) {
        return origin
    }

    return [targetRow, targetCol]
}

export default {
    empty,
    fill,
    filled,
    isValid,
    move,
}
