"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var unique_1 = __importDefault(require("./unique"));
test('utils/array/unique', function () {
    expect(Array.from(unique_1.default([1, 2, 2]))).toEqual([1, 2]);
    expect(Array.from(unique_1.default([{ value: 1 }, { value: 2 }, { value: 2 }], function (o) { return o.value; }))).toEqual([1, 2]);
});
