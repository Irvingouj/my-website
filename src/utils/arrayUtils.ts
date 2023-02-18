

export const enumerate = <T>(arr: Array<T>): Array<[number, T]> => {
    return arr.map((item, index) => [index, item]);
};

export const findFirstDifference = <T>(arr1: Array<T>, arr2: Array<T>): [number, T|null] => {

    for (const [index, item] of enumerate(arr1)) {
        if (item !== arr2[index]) {
            return [index, arr2[index]];
        };
    }
    return [-1, null];
};