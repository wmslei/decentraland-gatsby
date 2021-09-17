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
var prop_types_1 = __importDefault(require("prop-types"));
var Segment_1 = __importDefault(require("./Development/Segment"));
function HTML(props) {
    return (react_1.default.createElement("html", __assign({}, props.htmlAttributes),
        react_1.default.createElement("head", null,
            react_1.default.createElement("meta", { charSet: "utf-8" }),
            react_1.default.createElement("meta", { httpEquiv: "x-ua-compatible", content: "ie=edge" }),
            react_1.default.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1, shrink-to-fit=no" }),
            props.headComponents),
        react_1.default.createElement("body", __assign({}, props.bodyAttributes),
            props.preBodyComponents,
            react_1.default.createElement("noscript", { key: "noscript", id: "gatsby-noscript" }, "This app works best with JavaScript enabled."),
            react_1.default.createElement("div", { key: "body", id: "___gatsby", dangerouslySetInnerHTML: { __html: props.body } }),
            props.postBodyComponents,
            react_1.default.createElement(Segment_1.default, { analyticsKey: process.env.SEGMENT_KEY || process.env.GATSBY_SEGMENT_KEY }))));
}
exports.default = HTML;
HTML.propTypes = {
    htmlAttributes: prop_types_1.default.object,
    headComponents: prop_types_1.default.array,
    bodyAttributes: prop_types_1.default.object,
    preBodyComponents: prop_types_1.default.array,
    body: prop_types_1.default.string,
    postBodyComponents: prop_types_1.default.array,
};
