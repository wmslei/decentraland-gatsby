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
function pad(value, prefixLength, decimalLength) {
    if (prefixLength === void 0) { prefixLength = 0; }
    if (decimalLength === void 0) { decimalLength = 0; }
    var n = Number(value);
    if (Number.isNaN(n)) {
        return 'NaN';
    }
    var fixed = n.toFixed(decimalLength);
    if (fixed === '-0') {
        fixed = '0';
    }
    var match = fixed.match(/^(\-)?(\d+)(\.\d+)?$/);
    if (!match) {
        return fixed;
    }
    var _a = __read(match, 4), sig = _a[1], num = _a[2], decimals = _a[3];
    var padLength = Math.max(prefixLength - num.length, 0);
    var pad = '0'.repeat(padLength);
    return [sig || '', pad, num, decimals].join('');
}
exports.default = pad;
