"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTransformStream = exports.isDuplexStream = exports.isReadableStream = exports.isWritableStream = void 0;
function isStream(stream) {
    return (stream !== null &&
        typeof stream === 'object' &&
        typeof stream.pipe === 'function');
}
exports.default = isStream;
function isWritableStream(stream) {
    return (isStream(stream) &&
        stream.writable !== false &&
        typeof stream._write === 'function' &&
        typeof stream._writableState === 'object');
}
exports.isWritableStream = isWritableStream;
function isReadableStream(stream) {
    return (isStream(stream) &&
        stream.readable !== false &&
        typeof stream._read === 'function' &&
        typeof stream._readableState === 'object');
}
exports.isReadableStream = isReadableStream;
function isDuplexStream(stream) {
    return isWritableStream(stream) && isReadableStream(stream);
}
exports.isDuplexStream = isDuplexStream;
function isTransformStream(stream) {
    return (isDuplexStream(stream) &&
        typeof stream._transform === 'function' &&
        typeof stream._transformState === 'object');
}
exports.isTransformStream = isTransformStream;
