"use strict";
/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
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
var react_helmet_1 = __importDefault(require("react-helmet"));
function Head(props) {
    var meta = __assign({ 'og:title': props.title || props.defaultTitle || '', 'twitter:title': props.title || props.defaultTitle || '', 'og:description': props.description || '', 'twitter:description': props.description || '', 'og:image': props.image || '', 'twitter:image': props.image || '', 'twitter:card': 'summary' }, props.meta);
    return (react_1.default.createElement(react_helmet_1.default, { htmlAttributes: { lang: props.lang }, titleTemplate: props.titleTemplate || '', defaultTitle: props.defaultTitle || '' },
        props.title && react_1.default.createElement("title", null, props.title),
        props.description && (react_1.default.createElement("meta", { name: "description", content: props.description })),
        props.image && react_1.default.createElement("meta", { name: "image", content: props.image }),
        Object.keys(meta)
            .filter(function (name) { return Boolean(meta[name]); })
            .map(function (name) {
            if (name.startsWith('og:')) {
                return react_1.default.createElement("meta", { key: name, property: name, content: meta[name] });
            }
            return react_1.default.createElement("meta", { key: name, name: name, content: meta[name] });
        }),
        props.children));
}
exports.default = Head;
Head.defaultProps = {
    lang: "en",
    meta: {},
    title: "",
    description: "",
};
