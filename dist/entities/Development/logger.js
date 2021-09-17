"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.write = function (log, data) {
        if (data === void 0) { data = {}; }
        if (process.env.NODE_ENV === 'production') {
            console.log(JSON.stringify(__assign({ log: log }, data)));
        }
        else {
            console.log(log, JSON.stringify(__assign({}, data)));
        }
    };
    Logger.prototype.log = function (log, data) {
        if (data === void 0) { data = {}; }
        return this.write(log, { level: 'info', data: data });
    };
    Logger.prototype.warning = function (log, data) {
        if (data === void 0) { data = {}; }
        return this.write(log, { level: 'warning', data: data });
    };
    Logger.prototype.error = function (log, data) {
        if (data === void 0) { data = {}; }
        if (data instanceof Error) {
            data = __assign(__assign({}, data), { message: data.message, stack: data.stack });
        }
        return this.write(log, { level: 'error', data: data });
    };
    return Logger;
}());
exports.Logger = Logger;
exports.default = new Logger();
