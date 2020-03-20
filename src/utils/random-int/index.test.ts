import randomInt from './'

describe(".randomInt", () => {
    describe("given an upper bound", () => {
        it("returns a random number between 0 and the UB", () => {
            for (let i = 0; i < 50; i++) {
                let random = randomInt(10)
                expect(random).toBeGreaterThanOrEqual(0)
                expect(random).toBeLessThan(10)
            }
        })
    })

    describe("given a lower bound", () => {
        it("returns a random number between the LB and the UB", () => {
            for (let i = 0; i < 50; i++) {
                let random = randomInt(4, 8)
                expect(random).toBeGreaterThanOrEqual(4)
                expect(random).toBeLessThan(8)
            }
        })
    })

    describe("given a negative bound", () => {
        it("returns a random number between the LB and the UB", () => {
            for (let i = 0; i < 50; i++) {
                let random = randomInt(-13, 5)
                expect(random).toBeGreaterThanOrEqual(-13)
                expect(random).toBeLessThan(5)
            }
        })
    })

    describe("given a lower bound greater than / equal to the upper bound", () => {
        it("raises an exception", () => {
            expect(() => randomInt(13, 5)).toThrowError(RangeError)
            expect(() => randomInt(3, 3)).toThrowError(RangeError)
            expect(() => randomInt(0)).toThrowError(RangeError)
            expect(() => randomInt(-1)).toThrowError(RangeError)
            expect(() => randomInt(10)).not.toThrowError(RangeError)
            expect(() => randomInt(0, 3)).not.toThrowError(RangeError)
        })
    })
})
