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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.decode = exports.sign = void 0;
var crypto_1 = require("crypto");
function sign(data, secret) {
    var str = JSON.stringify(data);
    var signature = hash(str, secret);
    return String(Buffer.from(str, 'utf8').toString('base64') + '.' + signature).replace(/\+/gi, '-');
}
exports.sign = sign;
function hash(str, secret) {
    return crypto_1.createHmac('sha256', secret).update(str).digest('base64');
}
function decode(data) {
    try {
        var _a = __read(data.split('.'), 1), str = _a[0];
        var decoded = Buffer.from(str.replace(/-/gi, '+'), 'base64').toString('utf8');
        return JSON.parse(decoded);
    }
    catch (err) {
        return null;
    }
}
exports.decode = decode;
function verify(data, secret) {
    try {
        var _a = __read(data.replace(/-/gi, '+').split('.'), 2), str = _a[0], expectedSignature = _a[1];
        var decoded = Buffer.from(str, 'base64').toString('utf8');
        var signature = hash(decoded, secret);
        if (signature !== expectedSignature) {
            return null;
        }
        return JSON.parse(decoded);
    }
    catch (err) {
        return null;
    }
}
exports.verify = verify;
