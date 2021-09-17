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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var clipboard_copy_1 = __importDefault(require("clipboard-copy"));
function useClipboardCopy(timeout) {
    var _a = __read(react_1.useState(null), 2), state = _a[0], setState = _a[1];
    function copy(value) {
        clipboard_copy_1.default(String(value !== null && value !== void 0 ? value : ''));
        setState(value);
    }
    function clear() {
        setState(null);
    }
    react_1.useEffect(function () {
        var copyTimeout = null;
        if (state && timeout && timeout > 0) {
            copyTimeout = setTimeout(function () { return clear(); }, timeout);
        }
        return function () {
            if (copyTimeout) {
                clearTimeout(copyTimeout);
            }
        };
    }, [state, timeout]);
    return [state, { copy: copy, clear: clear }];
}
exports.default = useClipboardCopy;
