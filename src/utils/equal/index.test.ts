import equal from './'

describe('.arrays', () => {
    it('returns false if unequal lengths', () => {
        const a = []
        const b = [1, 2]
        const isEqual = equal.arrays(a, b)
        expect(isEqual).toEqual(false)
    })

    it('returns false if different values', () => {
        const a = [1, 2]
        const b = [1, 3]
        const isEqual = equal.arrays(a, b)
        expect(isEqual).toEqual(false)
    })

    it('returns true if same length and values', () => {
        const a = [1, 2]
        const b = [1, 2]
        const isEqual = equal.arrays(a, b)
        expect(isEqual).toEqual(true)
    })

    it('compares using strict equality', () => {
        const a = [undefined]
        const b = [null]
        const isEqual = equal.arrays(a, b)
        expect(isEqual).toEqual(false)
    })

    it('returns true if both are empty', () => {
        const isEqual = equal.arrays([], [])
        expect(isEqual).toEqual(true)
    })
})
