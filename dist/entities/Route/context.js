"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = __importDefault(require("./error"));
var Context = /** @class */ (function () {
    function Context(req, res) {
        this.req = req;
        this.res = res;
    }
    Context.prototype.header = function (name, defaultValue) {
        var _a;
        if (defaultValue === void 0) { defaultValue = undefined; }
        return (_a = this.req.header(name)) !== null && _a !== void 0 ? _a : defaultValue;
    };
    Context.prototype.value = function (name, value, options) {
        if (options === void 0) { options = {}; }
        if (value === undefined || value === null) {
            if (options.required) {
                throw new error_1.default("Param " + name + " is required", error_1.default.BadRequest);
            }
            return null;
        }
        var finalValue = options.parser ? options.parser(value) : value;
        if (options.validator && !options.validator(finalValue)) {
            if (options.required) {
                throw new error_1.default("Invalid param " + name + ": \"" + value + "\"", error_1.default.BadRequest);
            }
            return null;
        }
        return finalValue;
    };
    Context.prototype.param = function (name, options) {
        var _a, _b;
        if (options === void 0) { options = {}; }
        var value = (_b = (_a = this.req.params[name]) !== null && _a !== void 0 ? _a : this.req.body[name]) !== null && _b !== void 0 ? _b : this.req.query[name];
        return this.value(name, value, options);
    };
    Context.prototype.pathParam = function (name, options) {
        if (options === void 0) { options = {}; }
        return this.value(name, this.req.params[name], options);
    };
    Context.prototype.searchParam = function (name, options) {
        if (options === void 0) { options = {}; }
        return this.value(name, this.req.query[name], options);
    };
    Context.prototype.bodyParam = function (name, options) {
        if (options === void 0) { options = {}; }
        return this.value(name, this.req.body[name], options);
    };
    return Context;
}());
exports.default = Context;
