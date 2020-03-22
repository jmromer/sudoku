/**
 * Return a random integer in range [floor, ceiling),
 * where floor is by default 0.
 *
 * @param {Number} bound1 if only bound given, upper bound (exclusive), otherwise lower bound (inclusive)
 * @param {Number?} bound2 upper bound (exclusive)
 *
 * @return {Number} a random integer
 */
export default function randomInt(bound1: number, bound2: number | null = null): number {
    let [lb, ub] = (bound2) ? [bound1, bound2] : [0, bound1]

    if (ub <= lb) {
        throw new RangeError('lower bound must be less than upper bound.')
    }

    return Math.floor(lb + Math.random() * (ub - lb))
}
