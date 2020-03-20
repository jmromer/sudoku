/**
 * Return a random integer between `floor` (default: 1) and `ceiling`, inclusive.
 *
 * @param {Number} ceiling lower bound
 * @param {Number} floor upper bound
 *
 * @return {Number} a random integer
 */
function randInt(ceiling: number, floor: number = 1): number {
    return Math.floor(Math.random() * (ceiling + floor))
}

/**
 * Shuffle the given array using the Fisher-Yates shuffle algorithm.
 *
 * @param {Array[Any]} array - an array
 * @param {boolean} inplace - whether to perform shuffle in place
 *
 * @return {Array[Any]} the shuffled array
 */
function shuffle(array: any[], inplace: boolean = true): any[] {
    const shuffled = inplace ? array : [...array]

    for (let i = shuffled.length; i > 0; i--) {
        const j = randInt(i);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    return shuffled
}



export default shuffle
