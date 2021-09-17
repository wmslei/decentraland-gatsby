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
require("./Link.css");
exports.default = react_1.default.memo(function Link(_a) {
    var secondary = _a.secondary, href = _a.href, rel = _a.rel, target = _a.target, props = __rest(_a, ["secondary", "href", "rel", "target"]);
    var external = href &&
        (href.startsWith('https://') ||
            href.startsWith('http://') ||
            href.startsWith('//'));
    if (!target && external) {
        target = '_blank';
    }
    if (external) {
        rel = new TokenList_1.default(rel).add('noopener', 'noreferrer').value;
    }
    return (react_1.default.createElement("a", __assign({}, props, { className: TokenList_1.default.join([
            variables_1.StyleNamespace,
            'Link',
            (props.onClick || href) && 'Link--pointer',
            props.className,
        ]), href: href || undefined, target: target || undefined, rel: rel || undefined })));
});
