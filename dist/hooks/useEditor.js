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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidator = exports.assert = void 0;
var react_1 = require("react");
var lodash_omit_1 = __importDefault(require("lodash.omit"));
function useEditor(editor, validator, initialState) {
    var _a = __read(react_1.useState({
        value: initialState,
        error: {},
        validated: false,
    }), 2), state = _a[0], setState = _a[1];
    function set(newProps, options) {
        if (options === void 0) { options = {}; }
        var value = editor(state.value, newProps);
        if (state.value !== value) {
            var keys = Object.keys(newProps);
            var newError = options.validate === false ? {} : validator(value, keys);
            var error_1 = clear(__assign(__assign({}, lodash_omit_1.default(state.error, keys)), newError));
            setState({ value: value, error: error_1, validated: false });
        }
    }
    function validate() {
        var keys = __spread(Object.keys(state.value), ['*']);
        var error = clear(validator(state.value, keys));
        if (Object.keys(error).length === 0) {
            setState({ value: state.value, error: error, validated: true });
        }
        else {
            setState({ value: state.value, error: error, validated: false });
        }
    }
    function error(err) {
        err = clear(err);
        if (Object.keys(err).length > 0) {
            setState({
                value: state.value,
                validated: false,
                error: __assign(__assign({}, state.error), err),
            });
        }
    }
    return [state, { set: set, validate: validate, error: error }];
}
exports.default = useEditor;
function clear(err) {
    var keys = Object.keys(err);
    var emptyKeys = keys.filter(function (key) { return err[key] === undefined || err[key] === null; });
    return lodash_omit_1.default(err, emptyKeys);
}
function assert(value, onError) {
    return value ? undefined : onError;
}
exports.assert = assert;
function createValidator(map) {
    return function (state, props) {
        var e_1, _a;
        var error = {};
        try {
            for (var props_1 = __values(props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
                var prop = props_1_1.value;
                var validator = map[prop];
                if (typeof validator === 'function') {
                    error = __assign(__assign({}, clear(validator(state, prop, props))), error);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (props_1_1 && !props_1_1.done && (_a = props_1.return)) _a.call(props_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return error;
    };
}
exports.createValidator = createValidator;
