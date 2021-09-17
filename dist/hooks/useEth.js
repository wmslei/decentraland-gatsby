"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var eth_1 = require("web3x/eth");
function useEth(provider) {
    return react_1.useMemo(function () { return (provider ? new eth_1.Eth(provider) : null); }, [provider]);
}
exports.default = useEth;
