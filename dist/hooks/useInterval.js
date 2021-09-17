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
var react_1 = require("react");
function useInterval(fun, interval, deps) {
    if (deps === void 0) { deps = []; }
    var _a = __read(react_1.useState(fun()), 2), value = _a[0], setValue = _a[1];
    react_1.useEffect(function () {
        var timer = setInterval(function () { return setValue(fun()); }, interval);
        return function () { return clearInterval(timer); };
    }, __spread([interval], deps));
    return value;
}
exports.default = useInterval;
