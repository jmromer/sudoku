// Valid sudoku values
export type VALID_VALUE = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

// Valid sudoku values, and 0 to denote an empty space
export type VALUE = 0 | VALID_VALUE

// A grid row
export type ROW = [VALUE, VALUE, VALUE, VALUE, VALUE, VALUE, VALUE, VALUE, VALUE]

// A grid
export type GRID = [ROW, ROW, ROW, ROW, ROW, ROW, ROW, ROW, ROW]

// A valid grid array index
export type INDEX = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

// A valid grid coordinate index pair
export type COORD = [INDEX, INDEX]
