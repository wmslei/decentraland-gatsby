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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddEthereumChainParameters = exports.switchToChainId = exports.isLoading = exports.createConnection = exports.restoreConnection = exports.fetchChainId = exports.fetchAccounts = exports.getListener = exports.initialState = exports.AuthStatus = exports.AuthEvent = exports.chains = void 0;
var schemas_1 = require("@dcl/schemas");
var ConnectionManager_1 = require("decentraland-connect/dist/ConnectionManager");
var storage_1 = require("../utils/auth/storage");
var segment_1 = __importDefault(require("../utils/development/segment"));
var rollbar_1 = __importDefault(require("../utils/development/rollbar"));
var auth_1 = require("../utils/auth");
var SingletonListener_1 = __importDefault(require("../utils/dom/SingletonListener"));
var identify_1 = require("../utils/auth/identify");
var chainConfiguration_1 = require("decentraland-dapps/dist/lib/chainConfiguration");
exports.chains = [
    schemas_1.ChainId.ETHEREUM_MAINNET,
    schemas_1.ChainId.ETHEREUM_ROPSTEN,
    schemas_1.ChainId.ETHEREUM_GOERLI,
    schemas_1.ChainId.ETHEREUM_KOVAN,
    schemas_1.ChainId.ETHEREUM_RINKEBY,
    schemas_1.ChainId.MATIC_MAINNET,
    schemas_1.ChainId.MATIC_MUMBAI,
];
var AuthEvent;
(function (AuthEvent) {
    AuthEvent["Connect"] = "Connect";
    AuthEvent["Connected"] = "Connected";
    AuthEvent["Disconnected"] = "Disconnected";
})(AuthEvent = exports.AuthEvent || (exports.AuthEvent = {}));
var AuthStatus;
(function (AuthStatus) {
    AuthStatus[AuthStatus["Restoring"] = 0] = "Restoring";
    AuthStatus[AuthStatus["Disconnected"] = 1] = "Disconnected";
    AuthStatus[AuthStatus["Connected"] = 2] = "Connected";
    AuthStatus[AuthStatus["Connecting"] = 3] = "Connecting";
    AuthStatus[AuthStatus["Disconnecting"] = 4] = "Disconnecting";
})(AuthStatus = exports.AuthStatus || (exports.AuthStatus = {}));
exports.initialState = Object.freeze({
    selecting: false,
    account: null,
    identity: null,
    provider: null,
    providerType: null,
    chainId: null,
    error: null,
    status: AuthStatus.Restoring,
});
var WINDOW_LISTENER = null;
function getListener() {
    if (!WINDOW_LISTENER) {
        WINDOW_LISTENER = SingletonListener_1.default.from(window);
    }
    return WINDOW_LISTENER;
}
exports.getListener = getListener;
function fetchAccounts(provider) {
    return __awaiter(this, void 0, void 0, function () {
        var currentAccounts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, provider.request({
                        method: 'eth_accounts',
                    })];
                case 1:
                    currentAccounts = (_a.sent());
                    if (currentAccounts.length === 0) {
                        throw new Error("Provider is not connected");
                    }
                    return [2 /*return*/, currentAccounts.map(function (account) { return account.toLowerCase(); })];
            }
        });
    });
}
exports.fetchAccounts = fetchAccounts;
function fetchChainId(provider) {
    return __awaiter(this, void 0, void 0, function () {
        var currentChainId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, provider.request({
                        method: 'eth_chainId',
                    })];
                case 1:
                    currentChainId = (_a.sent());
                    return [2 /*return*/, parseInt(currentChainId, 16)];
            }
        });
    });
}
exports.fetchChainId = fetchChainId;
function restoreConnection() {
    return __awaiter(this, void 0, void 0, function () {
        var identity, connectionData, data, provider, account, providerType, currentAccounts, currentChainId, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    identity = storage_1.getCurrentIdentity();
                    connectionData = ConnectionManager_1.connection.getConnectionData();
                    // drop identity when connection data is missinig
                    if (identity && !connectionData) {
                        storage_1.setCurrentIdentity(null);
                    }
                    if (!(identity && connectionData)) return [3 /*break*/, 5];
                    return [4 /*yield*/, ConnectionManager_1.connection.connect(connectionData.providerType, connectionData.chainId)
                        // const previousConnection = await connection.tryPreviousConnection()
                    ];
                case 1:
                    data = _a.sent();
                    provider = data.provider;
                    if (!provider) {
                        throw new Error("Error getting provider");
                    }
                    return [4 /*yield*/, identify_1.ownerAddress(identity.authChain)];
                case 2:
                    account = _a.sent();
                    providerType = connectionData.providerType;
                    return [4 /*yield*/, fetchAccounts(data.provider)];
                case 3:
                    currentAccounts = _a.sent();
                    if (currentAccounts[0] !== account) {
                        throw new Error("Account changed");
                    }
                    return [4 /*yield*/, fetchChainId(data.provider)];
                case 4:
                    currentChainId = _a.sent();
                    return [2 /*return*/, {
                            account: account,
                            provider: provider,
                            chainId: Number(currentChainId),
                            providerType: providerType,
                            identity: identity,
                            status: AuthStatus.Connected,
                            selecting: false,
                            error: null,
                        }];
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    console.error(err_1);
                    rollbar_1.default(function (rollbar) { return rollbar.error(err_1); });
                    segment_1.default(function (analytics) {
                        return analytics.track('error', __assign(__assign({}, err_1), { message: err_1.message, stack: err_1.stack }));
                    });
                    return [2 /*return*/, __assign(__assign({}, exports.initialState), { status: AuthStatus.Disconnected, error: err_1.message })];
                case 7: return [2 /*return*/, __assign(__assign({}, exports.initialState), { status: AuthStatus.Disconnected })];
            }
        });
    });
}
exports.restoreConnection = restoreConnection;
function createConnection(providerType, chainId) {
    return __awaiter(this, void 0, void 0, function () {
        var data, identity_1, account, currentAccounts, currentChainId, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    ConnectionManager_1.connection.getConnectionData();
                    return [4 /*yield*/, ConnectionManager_1.connection.connect(providerType, chainId)];
                case 1:
                    data = _a.sent();
                    return [4 /*yield*/, auth_1.identify(data)];
                case 2:
                    identity_1 = _a.sent();
                    if (!(identity_1 && identity_1.authChain)) return [3 /*break*/, 6];
                    return [4 /*yield*/, identify_1.ownerAddress(identity_1.authChain)
                        // const previousConnection = await connection.tryPreviousConnection()
                    ];
                case 3:
                    account = _a.sent();
                    // const previousConnection = await connection.tryPreviousConnection()
                    Promise.resolve().then(function () {
                        storage_1.setCurrentIdentity(identity_1);
                    });
                    return [4 /*yield*/, fetchAccounts(data.provider)];
                case 4:
                    currentAccounts = _a.sent();
                    if (currentAccounts[0] !== account) {
                        throw new Error("Account changed");
                    }
                    return [4 /*yield*/, fetchChainId(data.provider)];
                case 5:
                    currentChainId = _a.sent();
                    return [2 /*return*/, {
                            account: account,
                            identity: identity_1,
                            chainId: Number(currentChainId),
                            providerType: providerType,
                            status: AuthStatus.Connected,
                            provider: data.provider,
                            selecting: false,
                            error: null,
                        }];
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_2 = _a.sent();
                    console.error(err_2);
                    rollbar_1.default(function (rollbar) { return rollbar.error(err_2); });
                    segment_1.default(function (analytics) {
                        return analytics.track('error', __assign(__assign({}, err_2), { message: err_2.message, stack: err_2.stack }));
                    });
                    storage_1.setCurrentIdentity(null);
                    return [2 /*return*/, __assign(__assign({}, exports.initialState), { status: AuthStatus.Disconnected, error: err_2.message })];
                case 8: return [2 /*return*/, __assign(__assign({}, exports.initialState), { status: AuthStatus.Disconnected })];
            }
        });
    });
}
exports.createConnection = createConnection;
function isLoading(status) {
    switch (status) {
        case AuthStatus.Connected:
        case AuthStatus.Disconnected:
            return false;
        default:
            return true;
    }
}
exports.isLoading = isLoading;
function switchToChainId(provider, chainId) {
    return __awaiter(this, void 0, void 0, function () {
        var switchError_1, currentChainId, addError_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!provider) return [3 /*break*/, 11];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 11]);
                    return [4 /*yield*/, provider.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: '0x' + chainId.toString(16) }],
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 11];
                case 3:
                    switchError_1 = _a.sent();
                    if (!(switchError_1.code === 4902)) return [3 /*break*/, 9];
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 7, , 8]);
                    return [4 /*yield*/, provider.request({
                            method: 'wallet_addEthereumChain',
                            params: [getAddEthereumChainParameters(chainId)],
                        })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, fetchChainId(provider)];
                case 6:
                    currentChainId = _a.sent();
                    if (currentChainId !== chainId) {
                        throw new Error('chainId did not change after adding network');
                    }
                    return [3 /*break*/, 8];
                case 7:
                    addError_1 = _a.sent();
                    throw new Error("Error adding network: " + addError_1.message);
                case 8: return [3 /*break*/, 10];
                case 9: throw new Error("Error switching network: " + switchError_1.message);
                case 10: return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.switchToChainId = switchToChainId;
function getAddEthereumChainParameters(chainId) {
    var hexChainId = '0x' + chainId.toString(16);
    var chainName = schemas_1.getChainName(chainId);
    var config = chainConfiguration_1.getChainConfiguration(chainId);
    switch (chainId) {
        case schemas_1.ChainId.MATIC_MAINNET:
            return {
                chainId: hexChainId,
                chainName: chainName,
                nativeCurrency: {
                    name: 'MATIC',
                    symbol: 'MATIC',
                    decimals: 18,
                },
                rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
                blockExplorerUrls: ['https://polygonscan.com/'],
            };
        case schemas_1.ChainId.MATIC_MUMBAI:
            return {
                chainId: hexChainId,
                chainName: chainName,
                nativeCurrency: {
                    name: 'MATIC',
                    symbol: 'MATIC',
                    decimals: 18,
                },
                rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
                blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
            };
        case schemas_1.ChainId.ETHEREUM_MAINNET:
        case schemas_1.ChainId.ETHEREUM_ROPSTEN:
        case schemas_1.ChainId.ETHEREUM_RINKEBY:
        case schemas_1.ChainId.ETHEREUM_KOVAN:
        case schemas_1.ChainId.ETHEREUM_GOERLI:
            return {
                chainId: hexChainId,
                chainName: chainName,
                nativeCurrency: {
                    name: 'Ether',
                    symbol: 'ETH',
                    decimals: 18,
                },
                rpcUrls: [config.rpcURL],
                blockExplorerUrls: ['https://etherscan.io'],
            };
    }
}
exports.getAddEthereumChainParameters = getAddEthereumChainParameters;
