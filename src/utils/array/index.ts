import random from 'utils/random'

/*
 * Are the given arrays equivalent by value?
 *
 * @param {any[]} arr1
 * @param {any[]} arr2
 *
 * @return {Boolean}
 */
function equal(arr1: any[], arr2: any[]): boolean {
    return arr1.length === arr2.length
        && arr1.every((value, index) => value === arr2[index])
}

/*
 * Shuffle the given array using the Fisher-Yates shuffle algorithm.
 *
 * @param {any[]} array - an array
 * @param {boolean} inplace - whether to perform shuffle in place
 *
 * @return {any[]} the shuffled array
 */
function shuffle(array: any[], inplace: boolean = true): any[] {
    const shuffled = inplace ? array : [...array]

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = random.int(i);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    return shuffled
}

export default { equal, shuffle }
