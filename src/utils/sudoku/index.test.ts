import sudokuGrid from './'

describe('.fill', () => {
    it('fills an empty grid', () => {
        const grid = sudokuGrid.empty()
        expect(new Set([].concat(...grid))).toEqual(new Set([0]))

        sudokuGrid.fill(grid)

        expect(sudokuGrid.isValid(grid)).toEqual(true)
    })

    it('fills a non-empty grid', () => {
        const grid = sudokuGrid.empty()
        grid[3][4] = 8
        grid[0][6] = 2

        sudokuGrid.fill(grid)

        expect(sudokuGrid.isValid(grid)).toEqual(true)
    })
})
