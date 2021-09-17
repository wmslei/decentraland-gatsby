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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var TokenList_1 = __importDefault(require("../../utils/dom/TokenList"));
var variables_1 = require("../../variables");
require("./Input.css");
var Paragraph_1 = __importDefault(require("../Text/Paragraph"));
function Input(_a) {
    var className = _a.className, size = _a.size, message = _a.message, verticalAlign = _a.verticalAlign, error = _a.error, props = __rest(_a, ["className", "size", "message", "verticalAlign", "error"]);
    var msg = typeof message === 'string' ? (react_1.default.createElement(Paragraph_1.default, { secondary: true }, message)) : (message);
    return (react_1.default.createElement("div", { className: TokenList_1.default.join([
            variables_1.StyleNamespace,
            'Input',
            props.disabled && "Input--disabled",
            error && "Input--error",
            size && "Input--" + size,
            verticalAlign && "Input--align-" + verticalAlign,
            className,
        ]) },
        react_1.default.createElement("input", __assign({}, props)),
        react_1.default.createElement("div", { className: "Input__Message" }, msg)));
}
exports.default = Input;
