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
var Time_1 = __importDefault(require("../utils/date/Time"));
function useTimeout(fun, at) {
    var initialValue = react_1.useMemo(function () {
        if (at.getTime() <= Date.now()) {
            return {
                executed: true,
                value: fun(),
                timeout: null,
            };
        }
        return { executed: false, value: null, timeout: null };
    }, []);
    var _a = __read(react_1.useState(initialValue), 2), state = _a[0], setState = _a[1];
    var execute = function () {
        if (state.executed) {
            return;
        }
        if (state.timeout) {
            clearTimeout(state.timeout);
        }
        if (at.getTime() > Date.now()) {
            var time = at.getTime() - Date.now();
            return setState({
                executed: false,
                value: null,
                timeout: setTimeout(execute, Math.min(time, Time_1.default.Day)),
            });
        }
        return setState({
            executed: true,
            value: fun(),
            timeout: null,
        });
    };
    react_1.useEffect(function () {
        if (state.executed) {
            return;
        }
        execute();
        return function () {
            if (state.timeout) {
                clearTimeout(state.timeout);
            }
        };
    }, [at.getTime()]);
    return state.value;
}
exports.default = useTimeout;
