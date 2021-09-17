"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEthPool = exports.getEths = exports.getCurrentProviders = exports.fromEndpoint = void 0;
var eth_1 = require("web3x/eth");
var providers_1 = require("web3x/providers");
var utils_1 = require("../Pool/utils");
var env_1 = __importDefault(require("../../utils/env"));
var ETHEREUM_ENDPOINT = env_1.default('ETHEREUM_ENDPOINT', '');
function fromEndpoint(endpoint) {
    var url = new URL(endpoint);
    switch (url.protocol) {
        case 'wss:':
            return new providers_1.WebsocketProvider(endpoint);
        case 'https:':
            return new providers_1.HttpProvider(endpoint);
        case null:
            return null;
        default:
            throw new Error("Invalid ethereum endpoint protocol: \"" + url.protocol + "\"");
    }
}
exports.fromEndpoint = fromEndpoint;
function getCurrentProviders() {
    return ETHEREUM_ENDPOINT.split(',')
        .map(function (endpoint) { return fromEndpoint(endpoint); })
        .filter(Boolean);
}
exports.getCurrentProviders = getCurrentProviders;
function getEths() {
    return getCurrentProviders().map(function (provider) { return new eth_1.Eth(provider); });
}
exports.getEths = getEths;
function getEthPool() {
    var eth = getEths();
    if (eth.length === 0) {
        console.log("creating empty pool");
    }
    return utils_1.createItemPool(eth);
}
exports.getEthPool = getEthPool;
