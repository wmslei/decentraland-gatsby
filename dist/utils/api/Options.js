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
var storage_1 = require("../auth/storage");
var base64_1 = require("../string/base64");
var Options = /** @class */ (function () {
    function Options(options) {
        if (options === void 0) { options = {}; }
        this.options = {};
        this.options = options;
    }
    Options.prototype.merge = function (options) {
        var raw = options.toObject();
        var newOptions = __assign(__assign({}, this.options), raw);
        if (this.options.headers || raw.headers) {
            newOptions.headers = __assign(__assign({}, this.options.headers), raw.headers);
        }
        return new Options(newOptions);
    };
    Options.prototype.set = function (options) {
        if (options === void 0) { options = {}; }
        var newOptions = __assign(__assign({}, this.options), options);
        if (this.options.headers) {
            newOptions.headers = this.options.headers;
        }
        if (this.options.body) {
            newOptions.headers = this.options.headers;
        }
        this.options = newOptions;
        return this;
    };
    Options.prototype.authorization = function () {
        var identity = storage_1.getCurrentIdentity();
        if (!identity || !identity.authChain) {
            return this;
        }
        return this.header('Authorization', 'Bearer ' + base64_1.toBase64(JSON.stringify(identity.authChain)));
    };
    Options.prototype.header = function (key, value) {
        if (!this.options.headers) {
            this.options.headers = {};
        }
        if (this.options.headers[key]) {
            console.warn("Can not set header \"" + key + "\" as \"" + value + "\" because is already defined as \"" + this.options.headers[key] + "\"");
        }
        else {
            this.options.headers[key] = value;
        }
        return this;
    };
    Options.prototype.headers = function (headers) {
        var _this = this;
        Object.keys(headers).forEach(function (key) { return _this.header(key, headers[key]); });
        return this;
    };
    Options.prototype.method = function (method) {
        this.options.method = method;
        return this;
    };
    Options.prototype.json = function (data) {
        this.header('Content-Type', 'application/json');
        this.options.body = JSON.stringify(data);
        return this;
    };
    Options.prototype.toObject = function () {
        return this.options;
    };
    return Options;
}());
exports.default = Options;
