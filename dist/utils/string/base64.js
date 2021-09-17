"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromWebPushKey = exports.fromBase64 = exports.toBase64 = void 0;
function toBase64(original) {
    if (typeof btoa === 'function' && typeof original === 'string') {
        return btoa(original);
    }
    else if (typeof btoa === 'function') {
        return btoa(String.fromCharCode.apply(String, __spread(new Uint8Array(original))));
    }
    else if (typeof original === 'string') {
        return Buffer.from(original, 'utf8').toString('base64');
    }
    else {
        return Buffer.from(original).toString('base64');
    }
}
exports.toBase64 = toBase64;
function fromBase64(encoded) {
    if (typeof atob === 'function') {
        return atob(encoded);
    }
    else {
        return Buffer.from(encoded, 'base64').toString('utf8');
    }
}
exports.fromBase64 = fromBase64;
function fromWebPushKey(base64String) {
    var padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    var rawData = fromBase64(base64);
    var outputArray = new Uint8Array(rawData.length);
    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
exports.fromWebPushKey = fromWebPushKey;
