"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionContext = exports.AuthContext = void 0;
var react_1 = __importStar(require("react"));
var useAuth_1 = __importDefault(require("../../hooks/useAuth"));
var useTransaction_1 = __importDefault(require("../../hooks/useTransaction"));
var defaultAuthState = [
    null,
    {
        selecting: false,
        loading: true,
        chainId: null,
        providerType: null,
        provider: null,
        error: null,
        switchTo: function () { },
        select: function () { },
        connect: function () { },
        disconnect: function () { },
    },
];
var defaultTransactionState = [
    [],
    {
        add: function () { },
        clear: function () { },
    },
];
exports.AuthContext = react_1.createContext(defaultAuthState);
exports.TransactionContext = react_1.createContext(defaultTransactionState);
exports.default = react_1.default.memo(function AuthProvider(props) {
    var auth = useAuth_1.default();
    var transactions = useTransaction_1.default(auth[0], auth[1].chainId);
    return (react_1.default.createElement(exports.AuthContext.Provider, { value: auth },
        react_1.default.createElement(exports.TransactionContext.Provider, { value: transactions }, props.children)));
});
