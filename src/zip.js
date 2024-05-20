"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function zip(target, source) {
    if (!target.length || !source.length)
        return [];
    const [one, ...rest1] = target;
    const [other, ...rest2] = source;
    return [[one, other], ...zip(rest1, rest2)];
}
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const res = zip(arr1, arr2);
