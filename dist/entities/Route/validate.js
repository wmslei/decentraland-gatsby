"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = __importDefault(require("./error"));
function validate(validator, body) {
    if (body === void 0) { body = {}; }
    if (!validator(body) && validator.errors && validator.errors.length > 0) {
        var errors = validator.errors
            .map(function (error) { return error.dataPath.slice(1) + " " + error.message; })
            .filter(Boolean);
        throw new error_1.default('Bad request', error_1.default.BadRequest, {
            errors: errors,
            body: body,
        });
    }
    return body;
}
exports.default = validate;
