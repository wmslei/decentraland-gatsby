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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var schemas_1 = require("@dcl/schemas");
var types_1 = require("decentraland-connect/dist/types");
var Modal_1 = require("decentraland-ui/dist/components/Modal/Modal");
var Button_1 = require("decentraland-ui/dist/components/Button/Button");
var ModalNavigation_1 = require("decentraland-ui/dist/components/ModalNavigation/ModalNavigation");
var useLocalFormatMessage_1 = __importDefault(require("../../hooks/useLocalFormatMessage"));
var defaultI18n = {
    header: 'Wrong Network',
    message: 'You need to be connected to {expectedChainName} to use this app, but you are currently connected to {currentChainName}.',
    change_chain: 'switch to {expectedChainName}',
    separator: ' or ',
    unknown_chain: 'Unknown',
};
var anyNetwork = [
    schemas_1.ChainId.ETHEREUM_GOERLI,
    schemas_1.ChainId.ETHEREUM_KOVAN,
    schemas_1.ChainId.ETHEREUM_MAINNET,
    schemas_1.ChainId.ETHEREUM_RINKEBY,
    schemas_1.ChainId.ETHEREUM_ROPSTEN,
    schemas_1.ChainId.MATIC_MAINNET,
    schemas_1.ChainId.MATIC_MUMBAI,
];
exports.default = react_1.default.memo(function WrongNetworkModal(_a) {
    var open = _a.open, currentNetwork = _a.currentNetwork, expectedNetwork = _a.expectedNetwork, onSwitchNetwork = _a.onSwitchNetwork, providerType = _a.providerType, i18n = _a.i18n, props = __rest(_a, ["open", "currentNetwork", "expectedNetwork", "onSwitchNetwork", "providerType", "i18n"]);
    var l = useLocalFormatMessage_1.default(i18n, defaultI18n, 'WrongNetworkModal');
    var expectedNetworks = react_1.useMemo(function () {
        if (!expectedNetwork) {
            return anyNetwork;
        }
        if (Array.isArray(expectedNetwork)) {
            return expectedNetwork;
        }
        return [expectedNetwork];
    }, [expectedNetwork]);
    var isOpen = react_1.useMemo(function () { return open !== null && open !== void 0 ? open : (!!currentNetwork && !expectedNetworks.includes(currentNetwork)); }, [open, currentNetwork, expectedNetworks]);
    var expectedChainName = react_1.useMemo(function () {
        switch (expectedNetworks.length) {
            case 0:
                return react_1.default.createElement("b", null);
            case 1:
                return react_1.default.createElement("b", null, schemas_1.getChainName(expectedNetworks[0]));
            default:
                return (react_1.default.createElement("span", null, expectedNetworks.map(function (chainId, i, list) { return (react_1.default.createElement("span", { key: chainId },
                    react_1.default.createElement("b", null, schemas_1.getChainName(chainId)),
                    i === list.length - 1
                        ? ', '
                        : l('@growth.WrongNetworkModal.separator'))); })));
        }
    }, [expectedNetworks]);
    var currentChainName = react_1.useMemo(function () { return (react_1.default.createElement("b", null, currentNetwork
        ? schemas_1.getChainName(currentNetwork)
        : l('@growth.WrongNetworkModal.unknown_chain'))); }, [currentNetwork]);
    var allowNetworkSwitch = react_1.useMemo(function () { return providerType === types_1.ProviderType.INJECTED; }, [providerType]);
    return (react_1.default.createElement(Modal_1.Modal, __assign({ size: "tiny" }, props, { open: isOpen, style: { position: 'absolute' } }),
        react_1.default.createElement(ModalNavigation_1.ModalNavigation, { title: l('@growth.WrongNetworkModal.header') }),
        react_1.default.createElement(Modal_1.Modal.Content, null, l('@growth.WrongNetworkModal.message', {
            currentChainName: currentChainName,
            expectedChainName: expectedChainName,
        })),
        allowNetworkSwitch && expectedNetworks.length > 0 && (react_1.default.createElement(Modal_1.Modal.Content, null, expectedNetworks.map(function (chainId, index) {
            return (react_1.default.createElement(Button_1.Button, { fluid: true, key: chainId, basic: index !== 0, primary: index === 0, style: index === 0 ? {} : { marginTop: '1em' }, onClick: function () { return onSwitchNetwork && onSwitchNetwork(chainId); } }, l('@growth.WrongNetworkModal.change_chain', {
                expectedChainName: react_1.default.createElement("b", null, schemas_1.getChainName(chainId)),
            })));
        })))));
});
