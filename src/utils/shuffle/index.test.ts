import shuffle from './'

describe(".shuffle", () => {
    describe("in place", () => {
        it("shuffles the given array in place by default", () => {
            const original = [1, 2, 3, 4, 5]
            const arr = [...original]

            shuffle(arr)

            expect(arr).toHaveLength(original.length)
            expect(arr).not.toEqual(original)
            expect(arr).not.toContain(undefined)
        })
    })

    describe("not in place", () => {
        it("returns a shuffled array if not in place", () => {
            const original = [1, 2, 3, 4, 5]

            const arr = shuffle(original, false)

            expect(arr).toHaveLength(original.length)
            expect(original).toEqual([1, 2, 3, 4, 5])
            expect(arr).not.toEqual(original)
            expect(arr).not.toContain(undefined)
        })
    })
})
