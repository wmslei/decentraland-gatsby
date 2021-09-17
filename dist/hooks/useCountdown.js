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
function useCountdown(until) {
    var initial = react_1.useMemo(function () { return Date.now(); }, [until.getTime()]);
    var _a = __read(react_1.useState(initial), 2), now = _a[0], setNow = _a[1];
    var finished = until.getTime() <= now;
    var time = finished ? 0 : until.getTime() - now;
    react_1.useEffect(function () { return setNow(Date.now()); }, [initial]);
    react_1.useEffect(function () {
        if (finished) {
            return;
        }
        var interval = setInterval(function () { return setNow(Date.now()); }, Time_1.default.Second);
        return function () { return clearInterval(interval); };
    }, [finished]);
    return react_1.useMemo(function () {
        var days = (time / Time_1.default.Day) | 0;
        var hours = ((time % Time_1.default.Day) / Time_1.default.Hour) | 0;
        var minutes = ((time % Time_1.default.Hour) / Time_1.default.Minute) | 0;
        var seconds = ((time % Time_1.default.Minute) / Time_1.default.Second) | 0;
        var milliseconds = time % Time_1.default.Second | 0;
        return {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            milliseconds: milliseconds,
            time: time,
        };
    }, [time]);
}
exports.default = useCountdown;
