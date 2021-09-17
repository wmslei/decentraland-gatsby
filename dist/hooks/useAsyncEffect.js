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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var rollbar_1 = __importDefault(require("../utils/development/rollbar"));
var segment_1 = __importDefault(require("../utils/development/segment"));
function useAsyncEffect(callback, dependencies) {
    return react_1.useEffect(function () {
        var promise = callback().catch(function (err) {
            console.error("AsyncEffect error: ", err);
            rollbar_1.default(function (rollbar) { return rollbar.error('AsyncEffect error', err); });
            segment_1.default(function (analytics) {
                return analytics.track('error', __assign(__assign({}, err), { message: err.message, stack: err.stack }));
            });
        });
        return function () {
            promise.then(function (unsubscribe) {
                if (typeof unsubscribe === 'function') {
                    unsubscribe();
                }
            });
        };
    }, dependencies);
}
exports.default = useAsyncEffect;
