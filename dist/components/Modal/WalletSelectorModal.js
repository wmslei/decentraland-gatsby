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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var LoginModal_1 = require("decentraland-ui/dist/components/LoginModal/LoginModal");
var eth_1 = require("decentraland-dapps/dist/lib/eth");
var ConnectionManager_1 = require("decentraland-connect/dist/ConnectionManager");
var types_1 = require("decentraland-connect/dist/types");
require("./WalletSelectorModal.css");
var utils_1 = require("../../context/Auth/utils");
var enabledProviders = new Set([
    types_1.ProviderType.INJECTED,
    types_1.ProviderType.FORTMATIC,
    // ProviderType.NETWORK,
    types_1.ProviderType.WALLET_CONNECT,
]);
exports.default = react_1.default.memo(function WalletSelector(props) {
    var _a = __read(react_1.useState(null), 2), availableProviders = _a[0], setAvailableProviders = _a[1];
    // Detect available providers
    react_1.useEffect(function () {
        var _a;
        var providerTypes = (_a = props.availableProviders) !== null && _a !== void 0 ? _a : ConnectionManager_1.connection
            .getAvailableProviders()
            .filter(function (providerType) { return enabledProviders.has(providerType); });
        var providers = providerTypes.map(function (providerType) {
            switch (providerType) {
                case types_1.ProviderType.INJECTED:
                    if (eth_1.isCucumberProvider()) {
                        return [providerType, LoginModal_1.LoginModalOptionType.SAMSUNG];
                    }
                    else if (eth_1.isDapperProvider()) {
                        return [providerType, LoginModal_1.LoginModalOptionType.DAPPER];
                    }
                    else {
                        return [providerType, LoginModal_1.LoginModalOptionType.METAMASK];
                    }
                case types_1.ProviderType.NETWORK:
                    return [providerType, LoginModal_1.LoginModalOptionType.METAMASK];
                case types_1.ProviderType.WALLET_CONNECT:
                    return [providerType, LoginModal_1.LoginModalOptionType.WALLET_CONNECT];
                case types_1.ProviderType.FORTMATIC:
                    return [providerType, LoginModal_1.LoginModalOptionType.FORTMATIC];
            }
        });
        setAvailableProviders(providers);
    }, []);
    function handleConnect(providerType, chainId) {
        if (props.onConnect) {
            props.onConnect(providerType, chainId);
        }
    }
    return (react_1.default.createElement(LoginModal_1.LoginModal, { open: props.open, loading: props.loading, onClose: props.onClose },
        (availableProviders || []).map(function (_a) {
            var _b = __read(_a, 2), providerType = _b[0], optionType = _b[1];
            switch (providerType) {
                case types_1.ProviderType.INJECTED:
                    return (react_1.default.createElement(LoginModal_1.LoginModal.Option, { key: providerType, type: optionType, onClick: function () { return handleConnect(providerType, utils_1.getChainId()); } }));
                case types_1.ProviderType.FORTMATIC:
                    return (react_1.default.createElement(LoginModal_1.LoginModal.Option, { key: providerType, type: optionType, onClick: function () { return handleConnect(providerType, utils_1.getChainId()); } }));
                case types_1.ProviderType.WALLET_CONNECT:
                    return (react_1.default.createElement(LoginModal_1.LoginModal.Option, { key: providerType, type: optionType, onClick: function () { return handleConnect(providerType, utils_1.getChainId()); } }));
                default:
                    return null;
            }
        }),
        react_1.default.createElement("small", { className: "message" },
            "Trezor and smart contract wallets (like Dapper or Argent) cannot interact Polygon. Read more about the Trezor support status",
            ' ',
            react_1.default.createElement("a", { href: "https://github.com/trezor/trezor-firmware/pull/1568", target: "_blank", rel: "noopener noreferrer" }, "here")),
        props.error && react_1.default.createElement("p", { className: "error visible" }, props.error)));
});
