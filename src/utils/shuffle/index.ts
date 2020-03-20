import randomInt from 'utils/random-int'

/*
 * Shuffle the given array using the Fisher-Yates shuffle algorithm.
 *
 * @param {Array[Any]} array - an array
 * @param {boolean} inplace - whether to perform shuffle in place
 *
 * @return {Array[Any]} the shuffled array
 */
export default function shuffle(array: any[], inplace: boolean = true): any[] {
    const shuffled = inplace ? array : [...array]

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = randomInt(i);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    return shuffled
}
