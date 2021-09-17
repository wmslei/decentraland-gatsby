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
var react_highlight_1 = __importDefault(require("react-highlight"));
var variables_1 = require("../../variables");
require("highlight.js/styles/github-gist.css");
require("./Code.css");
exports.default = react_1.default.memo(function Code(_a) {
    var inline = _a.inline, children = _a.children, note = _a.note, value = _a.value, language = _a.language, props = __rest(_a, ["inline", "children", "note", "value", "language"]);
    return (react_1.default.createElement("pre", __assign({}, props, { className: TokenList_1.default.join([
            variables_1.StyleNamespace,
            'Code',
            !!note && 'Code--with-note',
            !inline && 'Code--block',
            inline && 'Code--inline',
            props.className,
        ]) }),
        !inline && note && react_1.default.createElement("div", { className: 'Code__Note' }, note),
        !language && react_1.default.createElement("pre", null, children !== null && children !== void 0 ? children : value),
        language && (react_1.default.createElement(react_highlight_1.default, { className: language }, children !== null && children !== void 0 ? children : value))));
});
