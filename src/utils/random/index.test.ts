import random from './'

describe('.int', () => {
    describe('given an upper bound', () => {
        it('returns a random number between 0 and the UB', () => {
            for (let i = 0; i < 50; i++) {
                let randInt = random.int(10)
                expect(randInt).toBeGreaterThanOrEqual(0)
                expect(randInt).toBeLessThan(10)
            }
        })
    })

    describe('given a lower bound', () => {
        it('returns a random number between the LB and the UB', () => {
            for (let i = 0; i < 50; i++) {
                let randInt = random.int(4, 8)
                expect(randInt).toBeGreaterThanOrEqual(4)
                expect(randInt).toBeLessThan(8)
            }
        })
    })

    describe('given a negative bound', () => {
        it('returns a randInt number between the LB and the UB', () => {
            for (let i = 0; i < 50; i++) {
                let randInt = random.int(-13, 5)
                expect(randInt).toBeGreaterThanOrEqual(-13)
                expect(randInt).toBeLessThan(5)
            }
        })
    })

    describe('given a lower bound greater than / equal to the upper bound', () => {
        it('raises an exception', () => {
            expect(() => random.int(13, 5)).toThrowError(RangeError)
            expect(() => random.int(3, 3)).toThrowError(RangeError)
            expect(() => random.int(0)).toThrowError(RangeError)
            expect(() => random.int(-1)).toThrowError(RangeError)
            expect(() => random.int(10)).not.toThrowError(RangeError)
            expect(() => random.int(0, 3)).not.toThrowError(RangeError)
        })
    })
})
