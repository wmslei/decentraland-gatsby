"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var random_1 = __importDefault(require("./random"));
describe('random', function () {
    test("positive values", function () {
        var mock = jest.fn(Math.random);
        Math.random = mock;
        mock.mockReturnValueOnce(0);
        expect(random_1.default(100)).toBe(0);
        mock.mockReturnValueOnce(0.5);
        expect(random_1.default(100)).toBe(50);
        mock.mockReturnValueOnce(0.999999);
        expect(random_1.default(100)).toBe(99);
    });
    test("positive ranges", function () {
        var mock = jest.fn(Math.random);
        Math.random = mock;
        mock.mockReturnValueOnce(0);
        expect(random_1.default(10, 100)).toBe(10);
        mock.mockReturnValueOnce(0.5);
        expect(random_1.default(10, 100)).toBe(55);
        mock.mockReturnValueOnce(0.999999);
        expect(random_1.default(10, 100)).toBe(99);
    });
    test("negative values", function () {
        var mock = jest.fn(Math.random);
        Math.random = mock;
        mock.mockReturnValueOnce(0);
        expect(random_1.default(-100)).toBe(0);
        mock.mockReturnValueOnce(0.5);
        expect(random_1.default(-100)).toBe(-50);
        mock.mockReturnValueOnce(0.999999);
        expect(random_1.default(-100)).toBe(-99);
    });
    test("negative range", function () {
        var mock = jest.fn(Math.random);
        Math.random = mock;
        mock.mockReturnValueOnce(0);
        expect(random_1.default(-10, -100)).toBe(-10);
        mock.mockReturnValueOnce(0);
        expect(random_1.default(-100, -10)).toBe(-100);
        mock.mockReturnValueOnce(0.5);
        expect(random_1.default(-10, -100)).toBe(-55);
        mock.mockReturnValueOnce(0.5);
        expect(random_1.default(-100, -10)).toBe(-55);
        mock.mockReturnValueOnce(0.999999);
        expect(random_1.default(-10, -100)).toBe(-99);
        mock.mockReturnValueOnce(0.999999);
        expect(random_1.default(-100, -10)).toBe(-11);
    });
});
