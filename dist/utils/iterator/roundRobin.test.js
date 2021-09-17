"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var roundRobin_1 = __importDefault(require("./roundRobin"));
describe('utils/iterator/roundRobin', function () {
    test("should iterate an array infinitely", function () {
        var randomList = [Math.random(), Math.random(), Math.random()];
        var getRandom = roundRobin_1.default(randomList);
        expect(getRandom()).toEqual(randomList[0]);
        expect(getRandom()).toEqual(randomList[1]);
        expect(getRandom()).toEqual(randomList[2]);
        expect(getRandom()).toEqual(randomList[0]);
        expect(getRandom()).toEqual(randomList[1]);
        expect(getRandom()).toEqual(randomList[2]);
        expect(getRandom()).toEqual(randomList[0]);
        expect(getRandom()).toEqual(randomList[1]);
        expect(getRandom()).toEqual(randomList[2]);
        expect(getRandom()).toEqual(randomList[0]);
        expect(getRandom()).toEqual(randomList[1]);
        expect(getRandom()).toEqual(randomList[2]);
    });
    test("should fail if the array is empty", function () {
        expect(function () { return roundRobin_1.default([]); }).toThrow("Round Robin required at least 1 item");
    });
});
