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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var TokenList_1 = __importDefault(require("../../utils/dom/TokenList"));
var variables_1 = require("../../variables");
require("./Blockquote.css");
function Blockquote(props) {
    return (react_1.default.createElement("blockquote", __assign({}, props, { className: TokenList_1.default.join([
            variables_1.StyleNamespace,
            'Blockquote',
            props.className,
        ]) })));
}
exports.default = Blockquote;
