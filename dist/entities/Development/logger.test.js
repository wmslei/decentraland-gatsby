"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("./logger"));
var mock = {
    log: jest.spyOn(logger_1.default, 'log'),
    error: jest.spyOn(logger_1.default, 'error'),
    warning: jest.spyOn(logger_1.default, 'warning'),
};
beforeEach(function () {
    mock.log.mockImplementation(function () { });
    mock.error.mockImplementation(function () { });
    mock.warning.mockImplementation(function () { });
});
afterEach(function () {
    mock.log.mockClear();
    mock.error.mockClear();
    mock.warning.mockClear();
});
test('logger should be a mock', function () {
    expect(logger_1.default.log.mock.calls).toEqual([]);
    expect(logger_1.default.error.mock.calls).toEqual([]);
    expect(logger_1.default.warning.mock.calls).toEqual([]);
});
exports.default = mock;
