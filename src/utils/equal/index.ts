/*
 * Are the given arrays equivalent by value?
 *
 * @param {Any[]} arr1
 * @param {Any[]} arr2
 *
 * @return {Boolean}
 */
function arrays(arr1: Any[], arr2: Any[]): boolean {
    return arr1.length === arr2.length
        && arr1.every((value, index) => value === arr2[index])
}

export default { arrays }
