"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChainId = exports.getDefaultChainId = exports.getSupportedChainIds = void 0;
var schemas_1 = require("@dcl/schemas");
var CHAIN_ID = String(process.env.GATSBY_CHAIN_ID ||
    process.env.REACT_APP_CHAIN_ID ||
    process.env.STORYBOOK_CHAIN_ID ||
    process.env.CHAIN_ID ||
    process.env.GATSBY_DEFAULT_CHAIN_ID ||
    process.env.REACT_APP_DEFAULT_CHAIN_ID ||
    process.env.STORYBOOK_DEFAULT_CHAIN_ID ||
    process.env.DEFAULT_CHAIN_ID ||
    String(schemas_1.ChainId.ETHEREUM_MAINNET))
    .split(',')
    .filter(Boolean)
    .map(function (chainId) { return Number(chainId); });
function getSupportedChainIds() {
    return CHAIN_ID;
}
exports.getSupportedChainIds = getSupportedChainIds;
function getDefaultChainId() {
    return CHAIN_ID[0];
}
exports.getDefaultChainId = getDefaultChainId;
function getChainId() {
    return CHAIN_ID[0];
}
exports.getChainId = getChainId;
