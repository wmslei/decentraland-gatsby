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
require("./ImgFixed.css");
exports.default = react_1.default.memo(function ImgFixed(_a) {
    var src = _a.src, dimension = _a.dimension, size = _a.size, background = _a.background, position = _a.position, props = __rest(_a, ["src", "dimension", "size", "background", "position"]);
    return (react_1.default.createElement("div", __assign({}, props, { className: TokenList_1.default.join([
            variables_1.StyleNamespace,
            'ImgFixed',
            "ImgFixed--" + (dimension || 'square'),
            props.className,
        ]), style: __assign(__assign({}, props.style), { backgroundColor: background || 'transparent', backgroundSize: size || 'cover', backgroundPosition: position || 'center center', backgroundImage: src && "url(\"" + src + "\")" }) }),
        react_1.default.createElement(Img, { dimension: dimension })));
});
var Img = react_1.default.memo(function (props) {
    switch (props.dimension) {
        case 'vertical':
            return (react_1.default.createElement("img", { src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAADCAYAAAC56t6BAAAAD0lEQVR4AWNwL/ABY0wGAFT5BhPIHHvgAAAAAElFTkSuQmCC", width: "2", height: "3" }));
        case 'wide':
            return (react_1.default.createElement("img", { src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAADUlEQVR4AWNwL/ABYwAKHQIHW//QwwAAAABJRU5ErkJggg==", width: "2", height: "1" }));
        case 'standard':
            return (react_1.default.createElement("img", { src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAD0lEQVR4AWNwL/BBwYQFADuuDCW4Y5knAAAAAElFTkSuQmCC", width: "4", height: "3" }));
        case 'square':
        case 'circle':
        default:
            return (react_1.default.createElement("img", { src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4AWNwL/BhAAADCQEEiiqnjQAAAABJRU5ErkJggg==", width: "1", height: "1" }));
    }
});
