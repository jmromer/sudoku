import fillGrid, { isValidGrid } from './'

const emptyGrid = () => [...Array(9)].map(() => [...Array(9)].map(() => 0))

describe('.fillGrid', () => {
    it('fills an empty grid', () => {
        const grid = emptyGrid()
        expect(new Set([].concat(...grid))).toEqual(new Set([0]))

        fillGrid(grid)

        expect(isValidGrid(grid)).toEqual(true)
    })

    it('fills a non-empty grid', () => {
        const grid = emptyGrid()
        grid[3][4] = 8
        grid[0][6] = 2

        fillGrid(grid)

        expect(isValidGrid(grid)).toEqual(true)
    })
})
