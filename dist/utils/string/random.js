"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomNumeric = exports.randomHexadecimal = exports.randomAlphanumeric = exports.randomCapitalAlphanumeric = exports.randomPassword = exports.randomFrom = void 0;
var random_1 = __importDefault(require("../number/random"));
function randomFrom(raw, len) {
    if (len === void 0) { len = 1; }
    return Array.from(Array(len), function () { return raw[random_1.default(raw.length)]; }).join('');
}
exports.randomFrom = randomFrom;
function randomPassword(len) {
    if (len === void 0) { len = 1; }
    return randomFrom('abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*()_+-=|[]{};:,./<>?', len);
}
exports.randomPassword = randomPassword;
function randomCapitalAlphanumeric(len) {
    if (len === void 0) { len = 1; }
    return randomFrom('abcdefghijkmnopqrstuvwxyzABCDEFGHIJKMNOPQRSTUVWXYZ0123456789', len);
}
exports.randomCapitalAlphanumeric = randomCapitalAlphanumeric;
function randomAlphanumeric(len) {
    if (len === void 0) { len = 1; }
    return randomFrom('abcdefghijkmnopqrstuvwxyz0123456789', len);
}
exports.randomAlphanumeric = randomAlphanumeric;
function randomHexadecimal(len) {
    if (len === void 0) { len = 1; }
    return randomFrom('0123456789abcdef', len);
}
exports.randomHexadecimal = randomHexadecimal;
function randomNumeric(len) {
    if (len === void 0) { len = 1; }
    return randomFrom('0123456789', len);
}
exports.randomNumeric = randomNumeric;
