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
exports.createFormatMessage = void 0;
var react_1 = __importDefault(require("react"));
var Markdown_1 = __importDefault(require("../../components/Text/Markdown"));
function createFormatMessage(shape) {
    var isEmpty = function (id) {
        return !shape.messages[id];
    };
    var str = function (id, values) {
        if (isEmpty(id)) {
            return null;
        }
        return shape.formatMessage({ id: id }, __assign({}, values));
    };
    var optional = function (id, values) {
        if (!id) {
            return '';
        }
        if (isEmpty(id)) {
            return id;
        }
        return shape.formatMessage({ id: id }, __assign({}, values));
    };
    var markdown = function (id, values) {
        var message = str(id, values);
        if (typeof message !== 'string') {
            return message;
        }
        return react_1.default.createElement(Markdown_1.default, { key: id, source: message });
    };
    return Object.assign(str, { markdown: markdown, optional: optional, isEmpty: isEmpty });
}
exports.createFormatMessage = createFormatMessage;
