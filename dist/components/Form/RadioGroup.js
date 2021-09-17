"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var TokenList_1 = __importDefault(require("../../utils/dom/TokenList"));
require("./RadioGroup.css");
function RadioGroup(props) {
    return (react_1.default.createElement("div", { className: TokenList_1.default.join([
            'dcl field RadioGroup',
            props.error && 'error',
            props.disabled && 'disabled',
            props.className,
        ]) },
        react_1.default.createElement("div", { className: "ui sub header" }, props.label),
        react_1.default.createElement("div", { className: "ui input" }, props.children),
        react_1.default.createElement("p", { className: "message" },
            props.message,
            "\u00A0")));
}
exports.default = RadioGroup;
