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
var createId_1 = require("../../utils/react/createId");
var variables_1 = require("../../variables");
var TokenList_1 = __importDefault(require("../../utils/dom/TokenList"));
require("./Title.css");
exports.default = react_1.default.memo(function Title(_a) {
    var small = _a.small, props = __rest(_a, ["small"]);
    return (react_1.default.createElement("h2", __assign({ id: createId_1.createId(props) }, props, { className: TokenList_1.default.join([
            variables_1.StyleNamespace,
            'Title',
            small && 'Title--small',
            props.className,
        ]) })));
});
