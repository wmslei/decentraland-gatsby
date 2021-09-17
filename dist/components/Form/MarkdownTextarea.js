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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Radio_1 = require("decentraland-ui/dist/components/Radio/Radio");
var Header_1 = require("decentraland-ui/dist/components/Header/Header");
var TokenList_1 = __importDefault(require("../../utils/dom/TokenList"));
var Textarea_1 = __importDefault(require("./Textarea"));
var Markdown_1 = __importDefault(require("../Text/Markdown"));
// import Label from './Label'
require("./MarkdownTextarea.css");
function MarkdownTextarea(_a) {
    var _b, _c, _d;
    var preview = _a.preview, label = _a.label, previewLabel = _a.previewLabel, className = _a.className, props = __rest(_a, ["preview", "label", "previewLabel", "className"]);
    var _e = __read(react_1.useState((_b = props.initialValue) !== null && _b !== void 0 ? _b : ''), 2), value = _e[0], setValue = _e[1];
    var _f = __read(react_1.useState(preview), 2), previewing = _f[0], setPreviewing = _f[1];
    function handleChange(e, data) {
        if (props.onChange) {
            props.onChange(e, data);
        }
        if (!e.defaultPrevented) {
            setValue(data.value || '');
        }
    }
    return (react_1.default.createElement("div", { className: TokenList_1.default.join([
            'dcl',
            'field',
            props.error && 'error',
            'MarkdownTextarea',
            className,
        ]) },
        react_1.default.createElement(Header_1.Header, { sub: true },
            label || '',
            " \u00A0 "),
        react_1.default.createElement(Radio_1.Radio, { toggle: true, label: previewLabel !== null && previewLabel !== void 0 ? previewLabel : 'PREVIEW', checked: preview !== null && preview !== void 0 ? preview : previewing, onChange: function () { return setPreviewing(!previewing); }, style: { position: 'absolute', right: 0, top: 0 } }),
        !previewing && (react_1.default.createElement(Textarea_1.default, __assign({}, props, { value: (_c = props.value) !== null && _c !== void 0 ? _c : value, onChange: handleChange }))),
        previewing && (react_1.default.createElement("div", { className: "MarkdownTextarea__Preview", style: { minHeight: (props.minHeight || 72) + 'px' } },
            react_1.default.createElement(Markdown_1.default, { source: (_d = props.value) !== null && _d !== void 0 ? _d : value }))),
        previewing && react_1.default.createElement("p", { className: "message" },
            " ",
            props.message,
            " \u00A0 ")));
}
exports.default = MarkdownTextarea;
