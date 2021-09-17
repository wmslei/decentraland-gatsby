"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var safe_1 = require("colors/safe");
var isEthereumAddress_1 = __importDefault(require("validator/lib/isEthereumAddress"));
var env_1 = __importDefault(require("../../utils/env"));
var adminAddresses = new Set((env_1.default('ADMIN_ADDRESSES', '') || '')
    .split(',')
    .filter(isEthereumAddress_1.default)
    .map(function (address) { return address.toLowerCase(); }));
adminAddresses.forEach(function (address) {
    return console.log('admin address:', safe_1.yellow(address));
});
function isAdmin(user) {
    if (!user) {
        return false;
    }
    return adminAddresses.has(user);
}
exports.default = isAdmin;
