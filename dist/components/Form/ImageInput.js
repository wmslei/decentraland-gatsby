"use strict";
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
var ImgFixed_1 = __importDefault(require("../Image/ImgFixed"));
var TokenList_1 = __importDefault(require("../../utils/dom/TokenList"));
var Loader_1 = require("decentraland-ui/dist/components/Loader/Loader");
require("./ImageInput.css");
function ImageInput(_a) {
    var value = _a.value, error = _a.error, loading = _a.loading, label = _a.label, message = _a.message, dimension = _a.dimension, className = _a.className, props = __rest(_a, ["value", "error", "loading", "label", "message", "dimension", "className"]);
    var hasDocument = typeof document !== 'undefined';
    var input = react_1.useMemo(function () {
        if (document) {
            var el = document.createElement('input');
            el.type = 'file';
            el.name = 'poster';
            el.accept = 'image/png, image/jpeg';
            return el;
        }
        else {
            return null;
        }
    }, [hasDocument]);
    function handleClick() {
        if (input && !loading && !props.disabled) {
            input.click();
        }
    }
    react_1.useEffect(function () {
        if (!input) {
            return function () { return null; };
        }
        function handleChange() {
            if (input && input.files && input.files[0] && props.onFileChange) {
                props.onFileChange(input.files[0]);
            }
        }
        input.addEventListener('change', handleChange);
        return function () {
            input.removeEventListener('change', handleChange);
        };
    }, [input]);
    return (react_1.default.createElement("div", { className: TokenList_1.default.join([
            'ImageInput',
            error && 'ImageInput--error',
            loading && 'ImageInput--loading',
            value && 'ImageInput--with-value',
            className,
        ]) },
        react_1.default.createElement("div", { className: "ImageInput__Label" }, label),
        react_1.default.createElement("div", { className: "ImageInput__Value" },
            react_1.default.createElement(ImgFixed_1.default, { dimension: dimension || 'wide', src: value }),
            react_1.default.createElement("div", { className: "ImageInput__Background" }),
            loading && react_1.default.createElement(Loader_1.Loader, { size: "medium", active: true }),
            !loading && (react_1.default.createElement("div", { className: "ImageInput__Content", onClick: handleClick }, props.children))),
        react_1.default.createElement("div", { className: "ImageInput__Message" }, message)));
}
exports.default = ImageInput;
