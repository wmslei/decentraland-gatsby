"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preloadType = exports.preloadAs = void 0;
var react_1 = __importDefault(require("react"));
var utils_1 = require("./utils");
function Preload(props) {
    var _a, _b;
    if (!props.href) {
        return null;
    }
    return (react_1.default.createElement("link", { rel: "preload", href: props.href, as: (_a = props.as) !== null && _a !== void 0 ? _a : preloadAs(props.href), type: (_b = props.type) !== null && _b !== void 0 ? _b : preloadType(props.href), media: props.media }));
}
exports.default = Preload;
function preloadAs(href) {
    var ext = utils_1.extension(href);
    switch (ext) {
        case 'aac':
        case 'flac':
        case 'm4a':
        case 'mp3':
        case 'oga':
        case 'wav':
            return 'audio';
        case 'ttf':
        case 'otf':
        case 'eot':
        case 'woff':
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
exports.preloadAs = preloadAs;
function preloadType(href) {
    var ext = utils_1.extension(href);
    switch (ext) {
        case 'apng':
        case 'bmp':
        case 'gif':
        case 'png':
        case 'webp':
            return 'image/' + ext;
        case 'ico':
        case 'cur':
            return 'image/x-icon';
        case 'jpg':
        case 'jpeg':
        case 'jfif':
        case 'pjpeg':
        case 'pjp':
            return 'image/jpeg';
        case 'svg':
            return 'image/svg+xml';
        case 'tif':
        case 'tiff':
            return 'image/tiff';
        case 'ttf':
        case 'otf':
        case 'eot':
        case 'woff':
        case 'woff2':
            return 'font/' + ext;
        case 'acc':
        case 'flac':
        case 'mp3':
        case 'wav':
            return 'audio/' + ext;
        case 'm4a':
            return 'audio/mp4';
        case 'oga':
            return 'audio/ogg';
        case 'webm':
        case 'mp4':
        case 'ogg':
            return 'video/' + ext;
        case 'mov':
            return 'video/quicktime';
        default:
            return undefined;
    }
}
exports.preloadType = preloadType;
