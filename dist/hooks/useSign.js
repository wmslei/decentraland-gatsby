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
var address_1 = require("web3x/address");
var personal_1 = require("web3x/personal");
var logger_1 = __importDefault(require("../entities/Development/logger"));
function useSign(address, provider) {
    var _a = __read(react_1.useState({
        message: null,
        signature: null,
        signing: false,
        error: null,
    }), 2), state = _a[0], setState = _a[1];
    react_1.useEffect(function () {
        if (state.signing && address && provider) {
            new personal_1.Personal(provider)
                .sign(state.message || '', address_1.Address.fromString(address), '')
                .then(function (signature) {
                return setState({
                    message: state.message,
                    signature: signature,
                    signing: false,
                    error: null,
                });
            })
                .catch(function (error) {
                logger_1.default.error("Error signing message: " + (state.message || '""'));
                setState({ message: null, signature: null, signing: false, error: error });
            });
        }
    }, [state.signing, address, provider]);
    function sign(message) {
        if (!state.signing) {
            setState({ message: message, signature: null, signing: true, error: null });
        }
    }
    return [
        { signature: state.signature, message: state.message },
        { sign: sign, signing: state.signing },
    ];
}
exports.default = useSign;
