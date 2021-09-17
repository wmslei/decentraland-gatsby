"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNetworkId = exports.parseEndpointId = void 0;
function parseEndpointId(endpoint) {
    var url = new URL(endpoint);
    return url.pathname.split('/')[2];
}
exports.parseEndpointId = parseEndpointId;
function parseNetworkId(endpoint) {
    var url = new URL(endpoint);
    var network = url.host.split('.')[0];
    switch (network) {
        case 'mainnet':
            return 1;
        case 'ropsten':
            return 3;
        case 'rinkeby':
            return 4;
        case 'goerli':
            return 5;
        case 'kovan':
            return 42;
        default:
            return null;
    }
}
exports.parseNetworkId = parseNetworkId;
