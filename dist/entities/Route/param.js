"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.integer = exports.number = exports.bool = exports.num = void 0;
var error_1 = __importDefault(require("./error"));
/**
 * @deprecated use the handle context instead
 */
function param(req, name, validator) {
    if (validator === void 0) { validator = Boolean; }
    var value;
    if (req.query && req.query[name]) {
        value = req.query[name];
    }
    else if (req.body && req.body[name]) {
        value = req.body[name];
    }
    else if (req.params && req.params[name]) {
        value = req.params[name];
    }
    if (validator && !validator(value)) {
        throw new error_1.default("Invalid param " + name + ": \"" + value + "\"", error_1.default.BadRequest);
    }
    return value;
}
exports.default = param;
function num(value) {
    if (typeof value === 'string') {
        value = Number(value);
    }
    if (typeof value === 'number' && Number.isFinite(value)) {
        return value;
    }
    return null;
}
exports.num = num;
function bool(value) {
    switch (value) {
        case 1:
        case true:
        case '1':
        case 'true':
        case 'True':
        case 'TRUE':
        case 'yes':
        case 'Yes':
        case 'YES':
            return true;
        case 0:
        case false:
        case '0':
        case 'false':
        case 'False':
        case 'FALSE':
        case 'no':
        case 'No':
        case 'NO':
            return false;
        default:
            return null;
    }
}
exports.bool = bool;
function number(value) {
    if (value === '' || value === undefined || value === null) {
        return null;
    }
    var parsed = Number(value);
    if (!Number.isFinite(parsed)) {
        return null;
    }
    return parsed;
}
exports.number = number;
function integer(value) {
    var parsed = number(value);
    if (parsed === null) {
        return null;
    }
    var int = parsed | 0;
    if (int !== parsed) {
        return null;
    }
    return int;
}
exports.integer = integer;
