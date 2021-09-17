"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chunk_1 = __importDefault(require("./chunk"));
test('utils/array/chunk', function () {
    expect(Array.from(chunk_1.default([1, 2, 3, 4, 5, 6]))).toEqual([
        [1],
        [2],
        [3],
        [4],
        [5],
        [6],
    ]);
    expect(Array.from(chunk_1.default([1, 2, 3, 4, 5, 6], 2))).toEqual([
        [1, 2],
        [3, 4],
        [5, 6],
    ]);
    expect(Array.from(chunk_1.default([1, 2, 3, 4, 5, 6], 3))).toEqual([
        [1, 2, 3],
        [4, 5, 6],
    ]);
    expect(Array.from(chunk_1.default([1, 2, 3, 4, 5, 6], 4))).toEqual([
        [1, 2, 3, 4],
        [5, 6],
    ]);
    expect(Array.from(chunk_1.default([1, 2, 3, 4, 5, 6], 5))).toEqual([
        [1, 2, 3, 4, 5],
        [6],
    ]);
    expect(Array.from(chunk_1.default([1, 2, 3, 4, 5, 6], 6))).toEqual([[1, 2, 3, 4, 5, 6]]);
    expect(Array.from(chunk_1.default([1, 2, 3, 4, 5, 6], 7))).toEqual([[1, 2, 3, 4, 5, 6]]);
    expect(Array.from(chunk_1.default([1, 2, 3, 4, 5, 6], 10))).toEqual([
        [1, 2, 3, 4, 5, 6],
    ]);
});
