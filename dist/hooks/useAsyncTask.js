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
function useAsyncTask(callback) {
    var _a = __read(react_1.useState({
        loading: false,
        args: null,
    }), 2), _b = _a[0], loading = _b.loading, args = _b.args, setLoading = _a[1];
    react_1.useEffect(function () {
        if (!loading) {
            return;
        }
        if (args === null) {
            return;
        }
        var cancelled = false;
        Promise.resolve()
            .then(function () { return callback.apply(void 0, __spread(args)); })
            .then(function () {
            if (cancelled) {
                return;
            }
            setLoading({ loading: false, args: null });
        })
            .catch(function (err) {
            console.error(err);
            rollbar_1.default(function (rollbar) { return rollbar.error(err); });
            segment_1.default(function (analytics) {
                return analytics.track('error', __assign(__assign({}, err), { message: err.message, stack: err.stack }));
            });
            if (cancelled) {
                return;
            }
            setLoading({ loading: false, args: null });
        });
        return function () {
            cancelled = true;
        };
    }, [loading]);
    return [
        loading,
        function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            setLoading({ loading: true, args: args });
        },
    ];
}
exports.default = useAsyncTask;
