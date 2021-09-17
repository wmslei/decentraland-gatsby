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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var TokenList_1 = __importDefault(require("../../utils/dom/TokenList"));
var variables_1 = require("../../variables");
require("./Textarea.css");
function Textarea(_a) {
    var minHeight = _a.minHeight, maxHeight = _a.maxHeight, props = __rest(_a, ["minHeight", "maxHeight"]);
    var ref = react_1.useRef(null);
    function handleRowChange() {
        if (!ref.current) {
            return;
        }
        var textarea = ref.current;
        textarea.style.height = 0 + 'px';
        var height = textarea.scrollHeight;
        if (minHeight !== undefined && height < minHeight) {
            height = minHeight;
        }
        if (maxHeight !== undefined && height > maxHeight) {
            height = maxHeight;
        }
        textarea.style.height = height + 2 + 'px';
    }
    function handleChange(event) {
        if (props.onChange) {
            props.onChange(event, __assign(__assign({}, props), { value: event.currentTarget.value }));
        }
        handleRowChange();
    }
    react_1.useEffect(function () { return handleRowChange(); }, []);
    var error = props.error, label = props.label, message = props.message, extra = __rest(props, ["error", "label", "message"]);
    return (react_1.default.createElement("div", { className: TokenList_1.default.join([
            'dcl field',
            props.error && 'error',
            props.disabled && 'disabled',
            variables_1.StyleNamespace,
            'Textarea',
        ]) },
        react_1.default.createElement("div", { className: "ui sub header" }, props.label),
        react_1.default.createElement("div", { className: "ui input" },
            props.error && (react_1.default.createElement("i", { "aria-hidden": "true", className: "warning circle icon" })),
            react_1.default.createElement("textarea", __assign({}, extra, { ref: ref, onChange: handleChange }))),
        react_1.default.createElement("p", { className: "message" },
            props.message,
            "\u00A0")));
}
exports.default = Textarea;
