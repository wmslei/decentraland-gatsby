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
exports.ErrorKind = void 0;
var react_1 = __importDefault(require("react"));
var Input_1 = __importDefault(require("./Input"));
var TokenList_1 = __importDefault(require("../../utils/dom/TokenList"));
var variables_1 = require("../../variables");
var Button_1 = require("decentraland-ui/dist/components/Button/Button");
var usePatchState_1 = __importDefault(require("../../hooks/usePatchState"));
var isEmail_1 = __importDefault(require("validator/lib/isEmail"));
require("isomorphic-fetch");
require("./Subscribe.css");
var ErrorKind;
(function (ErrorKind) {
    ErrorKind[ErrorKind["None"] = 0] = "None";
    ErrorKind[ErrorKind["InvalidEmail"] = 1] = "InvalidEmail";
    ErrorKind[ErrorKind["ServerError"] = 2] = "ServerError";
})(ErrorKind = exports.ErrorKind || (exports.ErrorKind = {}));
var DEFAULT_ACTION = process.env.GATSBY_SUBSCRIBE_TARGET || 'https://decentraland.org/v2/subscribe';
function Subscribe(props) {
    var _a = __read(usePatchState_1.default({
        email: '',
        loading: false,
        error: ErrorKind.None,
    }), 2), state = _a[0], patchState = _a[1];
    var intl = __assign({ cta: 'Sign up', inputError: 'Invalid email', serverError: 'Server error' }, props.intl);
    var placeholder = props.placeholder || 'email@domain.com';
    var action = props.action || DEFAULT_ACTION;
    var loading = props.loading || state.loading;
    var error = props.error || state.error;
    function handleChange(event) {
        patchState({ email: event.target.value, error: ErrorKind.None });
    }
    function handleSubmit(event) {
        var data = {
            email: state.email,
        };
        if (props.interest) {
            data.interest = props.interest;
        }
        if (props.lang) {
            data.lang = props.lang;
        }
        if (props.onSubmit) {
            props.onSubmit(event, data);
            if (event.isDefaultPrevented()) {
                return;
            }
        }
        event.preventDefault();
        if (!isEmail_1.default(data.email)) {
            patchState({ error: ErrorKind.InvalidEmail });
            return;
        }
        patchState({ loading: true });
        var req = props.method === 'GET'
            ? fetch(action +
                '?' +
                new URLSearchParams(data).toString())
            : fetch(action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        req
            .then(function (response) {
            patchState({
                loading: false,
                error: response.status >= 400 ? ErrorKind.ServerError : ErrorKind.None,
            });
            if (props.onSubscribe) {
                props.onSubscribe(data);
            }
        })
            .catch(function () { return patchState({ loading: false, error: ErrorKind.ServerError }); });
    }
    var inputMessage;
    switch (error) {
        case ErrorKind.InvalidEmail:
            inputMessage = intl.inputError;
            break;
        case ErrorKind.ServerError:
            inputMessage = intl.serverError;
            break;
    }
    return (react_1.default.createElement("form", { className: TokenList_1.default.join([variables_1.StyleNamespace, 'Subscribe', props.className]), action: action, onSubmit: handleSubmit },
        react_1.default.createElement(Input_1.default, { defaultValue: props.defaultValue, placeholder: placeholder, error: !!inputMessage, message: inputMessage, disabled: props.disabled || loading, value: state.email, onChange: handleChange }),
        react_1.default.createElement(Button_1.Button, { primary: props.primary, inverted: props.inverted, basic: props.basic, disabled: props.disabled, loading: loading, type: "submit" }, intl.cta)));
}
exports.default = Subscribe;
