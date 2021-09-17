"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultExposedHeaders = exports.defaultAllowedHeaders = exports.defaultOrigin = exports.createCorsOptions = void 0;
function createCorsOptions(options) {
    if (options === void 0) { options = {}; }
    if (options.corsOrigin) {
        return {
            origin: options.corsOrigin,
            allowedHeaders: options.allowedHeaders || exports.defaultAllowedHeaders,
            exposedHeaders: options.exposedHeaders || exports.defaultExposedHeaders,
        };
    }
    switch (options.cors) {
        case false:
        case 'same-origin':
            return {
                origin: false,
                allowedHeaders: options.allowedHeaders || exports.defaultAllowedHeaders,
                exposedHeaders: options.exposedHeaders || exports.defaultExposedHeaders,
            };
        case '*':
        case 'public':
            return {
                origin: '*',
                allowedHeaders: options.allowedHeaders || exports.defaultAllowedHeaders,
                exposedHeaders: options.exposedHeaders || exports.defaultExposedHeaders,
            };
        case 'default':
        default:
            return {
                origin: exports.defaultOrigin,
                allowedHeaders: options.allowedHeaders || exports.defaultAllowedHeaders,
                exposedHeaders: options.exposedHeaders || exports.defaultExposedHeaders,
            };
    }
}
exports.createCorsOptions = createCorsOptions;
exports.defaultOrigin = [
    /https?:\/\/localhost(\:\d{4,6})?/,
    /https?:\/\/127\.0\.0\.1(\:\d{4,6})?/,
    /https?:\/\/192\.168\.\d{1,3}\.\d{1,3}(\:\d{4,6})?/,
    /https:\/\/([a-zA-Z0-9\-_]+\.)*dcl\.gg/,
    /https:\/\/([a-zA-Z0-9\-_]+\.)*decentraland\.systems/,
    /https:\/\/([a-zA-Z0-9\-_]+\.)*decentraland\.today/,
    /https:\/\/([a-zA-Z0-9\-_]+\.)*decentraland\.zone/,
    /https:\/\/([a-zA-Z0-9\-_]+\.)*decentraland\.org/,
    /https:\/\/([a-zA-Z0-9\-_]+\.)*decentraland\.net/,
    /https:\/\/([a-zA-Z0-9\-_]+\.)*decentraland\.co/,
    /https:\/\/([a-zA-Z0-9\-_]+\.)*decentraland\.io/,
    /https:\/\/([a-zA-Z0-9\-_]+\.)*now\.sh/,
    /https:\/\/([a-zA-Z0-9\-_]+\.)*manaland\.cn/,
];
exports.defaultAllowedHeaders = ['Content-Type', 'Authorization'];
exports.defaultExposedHeaders = [
    'ETag',
    'Cache-Control',
    'Content-Language',
    'Content-Type',
    'Expires',
    'Last-Modified',
    'Pragma',
];
