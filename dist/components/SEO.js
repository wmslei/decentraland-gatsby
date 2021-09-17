"use strict";
/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var react_helmet_1 = __importDefault(require("react-helmet"));
var DEFAULT_AUTHOR = '@decentraland';
var DEFAULT_DESCRIPTION = '';
var DEFAULT_TITLE_TEMPLATE = '%s | Decentraland';
function useValue(value, defaultValue) {
    if (value === null) {
        return null;
    }
    return value || defaultValue;
}
function preloadAs(file) {
    var ext = file.slice(file.lastIndexOf('.') + 1);
    switch (ext) {
        case 'aac':
        case 'flac':
        case 'm4a':
        case 'mp3':
        case 'oga':
        case 'wav':
            return 'audio';
        case 'woff2':
            return 'font';
        case 'svg':
        case 'png':
        case 'gif':
        case 'jpg':
        case 'jpeg':
        case 'jfif':
        case 'pjpeg':
        case 'pjp':
        case 'tif':
        case 'tiff':
        case 'apng':
        case 'bmp':
        case 'ico':
        case 'cur':
        case 'webp':
            return 'image';
        case 'js':
            return 'script';
        case 'css':
            return 'style';
        case 'webm':
        case '3gp':
        case 'mp4':
        case 'ogg':
        case 'ogv':
        case 'mov':
            return 'video';
        default:
            return undefined;
    }
}
function preloadType(file) {
    var ext = file.slice(file.lastIndexOf('.') + 1);
    switch (ext) {
        case 'apng':
            return 'image/apng';
        case 'bmp':
            return 'image/bmp';
        case 'gif':
            return 'image/gif';
        case 'ico':
        case 'cur':
            return 'image/x-icon';
        case 'jpg':
        case 'jpeg':
        case 'jfif':
        case 'pjpeg':
        case 'pjp':
            return 'image/jpeg';
        case 'png':
            return 'image/png';
        case 'svg':
            return 'image/svg+xml';
        case 'tif':
        case 'tiff':
            return 'image/tiff';
        case 'webp':
            return 'image/webp';
        case 'acc':
            return 'audio/acc';
        case 'flac':
            return 'audio/flac';
        case 'mp3':
            return 'audio/mp3';
        case 'm4a':
            return 'audio/mp4';
        case 'oga':
            return 'audio/ogg';
        case 'wav':
            return 'audio/wav';
        case 'woff2':
            return 'font/woff2';
        case 'webm':
            return 'video/webm';
        case 'mp4':
            return 'video/mp4';
        case 'ogg':
            return 'video/ogg';
        case 'mov':
            return 'video/quicktime';
        case 'webm':
            return 'video/webm';
        default:
            return undefined;
    }
}
function SEO(_a) {
    var description = _a.description, lang = _a.lang, meta = _a.meta, title = _a.title, titleTemplate = _a.titleTemplate, author = _a.author, preload = _a.preload;
    var currentAuthor = useValue(author, DEFAULT_AUTHOR);
    var currentDescription = useValue(description, DEFAULT_DESCRIPTION);
    var currentTitleTemplate = useValue(titleTemplate, DEFAULT_TITLE_TEMPLATE);
    var currentMeta = __spread([
        !currentDescription && {
            name: "description",
            content: currentDescription,
        },
        !!currentDescription && {
            name: "twitter:description",
            content: currentDescription,
        },
        !!currentDescription && {
            property: "og:description",
            content: currentDescription,
        },
        {
            property: "og:title",
            content: title,
        },
        {
            property: "og:type",
            content: "website",
        },
        {
            name: "twitter:card",
            content: "summary",
        },
        !!currentAuthor && {
            name: "twitter:creator",
            content: currentAuthor,
        },
        {
            name: "twitter:title",
            content: title,
        }
    ], meta).filter(Boolean);
    return (react_1.default.createElement(react_helmet_1.default, { htmlAttributes: {
            lang: lang,
        }, title: title, titleTemplate: currentTitleTemplate || '', meta: currentMeta }, (preload || []).map(function (file) { return (react_1.default.createElement("link", { key: file, rel: "preload", href: file, as: preloadAs(file), type: preloadType(file) })); })));
}
exports.default = SEO;
SEO.defaultProps = {
    lang: "en",
    meta: [],
    preload: [],
    description: "",
};
SEO.propTypes = {
    description: prop_types_1.default.string,
    lang: prop_types_1.default.string,
    meta: prop_types_1.default.arrayOf(prop_types_1.default.object),
    title: prop_types_1.default.string.isRequired,
};
