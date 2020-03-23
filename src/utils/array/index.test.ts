import array from './'

describe('.equal', () => {
    it('returns false if unequal lengths', () => {
        const a = []
        const b = [1, 2]
        const isEqual = array.equal(a, b)
        expect(isEqual).toEqual(false)
    })

    it('returns false if different values', () => {
        const a = [1, 2]
        const b = [1, 3]
        const isEqual = array.equal(a, b)
        expect(isEqual).toEqual(false)
    })

    it('returns true if same length and values', () => {
        const a = [1, 2]
        const b = [1, 2]
        const isEqual = array.equal(a, b)
        expect(isEqual).toEqual(true)
    })

    it('compares using strict equality', () => {
        const a = [undefined]
        const b = [null]
        const isEqual = array.equal(a, b)
        expect(isEqual).toEqual(false)
    })

    it('returns true if both are empty', () => {
        const isEqual = array.equal([], [])
        expect(isEqual).toEqual(true)
    })
})

describe('.shuffle', () => {
    describe('in place', () => {
        it('shuffles the given array in place by default', () => {
            const original = [1, 2, 3, 4, 5]
            const arr = [...original]

            array.shuffle(arr)

            expect(arr).toHaveLength(original.length)
            expect(arr).not.toEqual(original)
            expect(arr).not.toContain(undefined)
        })
    })

    describe('not in place', () => {
        it('returns a shuffled array if not in place', () => {
            const original = [1, 2, 3, 4, 5]

            const arr = array.shuffle(original, false)

            expect(arr).toHaveLength(original.length)
            expect(original).toEqual([1, 2, 3, 4, 5])
            expect(arr).not.toEqual(original)
            expect(arr).not.toContain(undefined)
        })
    })
})
