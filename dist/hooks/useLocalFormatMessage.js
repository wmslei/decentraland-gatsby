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
var flat_1 = __importDefault(require("flat"));
var react_intl_1 = require("react-intl");
var intl_1 = require("../utils/react/intl");
var localCache = react_intl_1.createIntlCache();
function useLocalFormatMessage(messages, defualtMessages, namespace) {
    var msg = react_1.useMemo(function () {
        var _a;
        return flat_1.default({
            '@growth': (_a = {}, _a[namespace] = __assign(__assign({}, defualtMessages), messages), _a),
        });
    }, [messages, defualtMessages]);
    var intl = react_1.useMemo(function () { return react_intl_1.createIntl({ locale: 'en', messages: msg }, localCache); }, [msg]);
    return react_1.useMemo(function () { return intl_1.createFormatMessage(intl); }, [intl]);
}
exports.default = useLocalFormatMessage;
