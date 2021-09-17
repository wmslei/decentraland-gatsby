"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var rollbar_1 = __importDefault(require("../utils/development/rollbar"));
var segment_1 = __importDefault(require("../utils/development/segment"));
function useAsyncTasks(callback) {
    var _a = __read(react_1.useState([]), 2), tasks = _a[0], setTasks = _a[1];
    var tasksIds = react_1.useMemo(function () { return tasks.map(function (_a) {
        var _b = __read(_a, 1), id = _b[0];
        return id;
    }); }, [tasks]);
    function addTask(id) {
        var extra = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            extra[_i - 1] = arguments[_i];
        }
        if (tasks.find(function (_a) {
            var _b = __read(_a, 1), currentId = _b[0];
            return currentId === id;
        })) {
            return;
        }
        var task = Promise.resolve()
            .then(function () { return callback.apply(void 0, __spread([id], extra)); })
            .then(function () {
            setTasks(function (current) { return current.filter(function (_a) {
                var _b = __read(_a, 1), currentId = _b[0];
                return currentId !== id;
            }); });
        })
            .catch(function (err) {
            console.error(err);
            rollbar_1.default(function (rollbar) { return rollbar.error(err); });
            segment_1.default(function (analytics) {
                return analytics.track('error', __assign(__assign({}, err), { id: id, params: extra, message: err.message, stack: err.stack }));
            });
            setTasks(function (current) { return current.filter(function (_a) {
                var _b = __read(_a, 1), currentId = _b[0];
                return currentId !== id;
            }); });
        });
        setTasks(function (current) { return __spread(current, [[id, task]]); });
    }
    return [tasksIds, addTask];
}
exports.default = useAsyncTasks;
