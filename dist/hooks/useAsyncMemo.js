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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAsyncMemoState = void 0;
var react_1 = require("react");
var rollbar_1 = __importDefault(require("../utils/development/rollbar"));
var segment_1 = __importDefault(require("../utils/development/segment"));
function createAsyncMemoState(value) {
    return {
        version: 0,
        loading: false,
        time: 0,
        error: null,
        reload: function () { },
        set: function () { },
    };
}
exports.createAsyncMemoState = createAsyncMemoState;
/**
 * Execute and async function and save the result in the component memory,
 * it will execute again each time deps change, and it return only the result
 * for the latest change
 *
 * @param callback - async function
 * @param deps - dependency list
 * @param options.initialValue - initial memo value (default=null)
 * @param options.callWithTruthyDeps - if true the effect will be executed only when
 *   all values in the dependency list are evaluated as true
 */
function useAsyncMemo(callback, deps, options) {
    var _a;
    if (deps === void 0) { deps = []; }
    if (options === void 0) { options = {}; }
    var _b = __read(react_1.useState({
        version: 0,
        loading: false,
        value: ((_a = options.initialValue) !== null && _a !== void 0 ? _a : null),
        time: 0,
        error: null,
    }), 2), state = _b[0], setState = _b[1];
    function load() {
        if (options.callWithTruthyDeps &&
            deps.some(function (dep) { return Boolean(dep) === false; })) {
            return;
        }
        setState(function (current) { return (__assign(__assign({}, current), { loading: true, version: current.version + 1 })); });
    }
    react_1.useEffect(function () {
        load();
    }, deps);
    react_1.useEffect(function () {
        if (!state.loading) {
            return;
        }
        var cancelled = false;
        var loading = false;
        var initial = Date.now();
        Promise.resolve()
            .then(function () { return callback(); })
            .then(function (value) {
            if (cancelled) {
                return;
            }
            setState(function (current) { return (__assign(__assign({}, current), { value: value, error: null, loading: loading, time: Date.now() - initial })); });
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
            setState(function (current) { return (__assign(__assign({}, current), { value: current.value, error: err, loading: loading, time: Date.now() - initial })); });
        });
        return function () {
            cancelled = true;
        };
    }, [state.version, state.loading]);
    function set(value) {
        var newValue = typeof value === 'function'
            ? value(state.value)
            : value;
        setState(function (current) { return (__assign(__assign({}, current), { value: newValue })); });
    }
    return [
        state.value,
        {
            version: state.version,
            loading: state.loading,
            error: state.error,
            time: state.time,
            reload: load,
            set: set,
        },
    ];
}
exports.default = useAsyncMemo;
