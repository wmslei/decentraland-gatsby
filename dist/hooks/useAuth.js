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
exports.initialState = void 0;
var react_1 = require("react");
var types_1 = require("decentraland-connect/dist/types");
var ConnectionManager_1 = require("decentraland-connect/dist/ConnectionManager");
var storage_1 = require("../utils/auth/storage");
var segment_1 = __importDefault(require("../utils/development/segment"));
var rollbar_1 = __importDefault(require("../utils/development/rollbar"));
var types_2 = require("../utils/loader/types");
var logger_1 = __importDefault(require("../entities/Development/logger"));
var useAsyncTask_1 = __importDefault(require("./useAsyncTask"));
var useAuth_utils_1 = require("./useAuth.utils");
Object.defineProperty(exports, "initialState", { enumerable: true, get: function () { return useAuth_utils_1.initialState; } });
var CONNECTION_PROMISE = null;
function useAuth() {
    var _this = this;
    var _a = __read(react_1.useState(__assign({}, useAuth_utils_1.initialState)), 2), state = _a[0], setState = _a[1];
    function select(selecting) {
        if (selecting === void 0) { selecting = true; }
        if (useAuth_utils_1.isLoading(state.status)) {
            return;
        }
        if (selecting === state.selecting) {
            return;
        }
        setState(function (current) { return (__assign(__assign({}, current), { selecting: selecting })); });
    }
    function connect(providerType, chainId) {
        if (useAuth_utils_1.isLoading(state.status)) {
            return;
        }
        if (state.account) {
            console.warn("Already connected as \"" + state.account + "\"");
            return;
        }
        var conn = { providerType: providerType, chainId: chainId };
        if (!providerType || !chainId) {
            console.error("Invalid connection params: " + JSON.stringify(conn));
            rollbar_1.default(function (rollbar) {
                return rollbar.error("Invalid connection params: " + JSON.stringify(conn));
            });
            segment_1.default(function (analytics) {
                return analytics.track('error', {
                    message: "Invalid connection params: " + JSON.stringify(conn),
                    conn: conn,
                });
            });
            return;
        }
        segment_1.default(function (analytics, context) {
            return analytics.track(useAuth_utils_1.AuthEvent.Connect, __assign(__assign({}, context), conn));
        });
        setState({
            account: null,
            identity: null,
            provider: null,
            error: null,
            selecting: state.selecting,
            status: useAuth_utils_1.AuthStatus.Connecting,
            providerType: providerType,
            chainId: chainId,
        });
    }
    function disconnect() {
        if (useAuth_utils_1.isLoading(state.status)) {
            return;
        }
        if (!state.account) {
            return;
        }
        setState({
            status: useAuth_utils_1.AuthStatus.Disconnecting,
            account: null,
            identity: null,
            provider: null,
            error: null,
            selecting: false,
            providerType: null,
            chainId: null,
        });
    }
    var _b = __read(useAsyncTask_1.default(function (chainId) { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(state.providerType === types_1.ProviderType.INJECTED)) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, useAuth_utils_1.switchToChainId(state.provider, chainId)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    setState(__assign(__assign({}, state), { error: err_1.message }));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }), 2), switching = _b[0], switchTo = _b[1];
    // bootstrap
    react_1.useEffect(function () {
        var cancelled = false;
        function updateIdetity(newIdentity) {
            if (!cancelled) {
                setState(function (currentState) {
                    if (currentState.identity === newIdentity) {
                        return currentState;
                    }
                    if (newIdentity) {
                        return {
                            status: useAuth_utils_1.AuthStatus.Restoring,
                            selecting: false,
                            account: null,
                            identity: null,
                            provider: null,
                            providerType: null,
                            chainId: null,
                            error: null,
                        };
                    }
                    return {
                        status: useAuth_utils_1.AuthStatus.Disconnecting,
                        selecting: false,
                        account: null,
                        identity: null,
                        provider: null,
                        providerType: null,
                        chainId: null,
                        error: null,
                    };
                });
            }
        }
        useAuth_utils_1.getListener().addEventListener(types_2.PersistedKeys.Identity, updateIdetity);
        return function () {
            cancelled = true;
            useAuth_utils_1.getListener().removeEventListener(types_2.PersistedKeys.Identity, updateIdetity);
        };
    }, []);
    // connect or disconnect
    react_1.useEffect(function () {
        var cancelled = false;
        if (state.status === useAuth_utils_1.AuthStatus.Restoring) {
            if (!CONNECTION_PROMISE) {
                CONNECTION_PROMISE = useAuth_utils_1.restoreConnection();
            }
            Promise.resolve(CONNECTION_PROMISE)
                .then(function (result) {
                if (!cancelled) {
                    setState(result);
                }
                CONNECTION_PROMISE = null;
            })
                .catch(function (err) {
                logger_1.default.error('Error restoring session', err);
                CONNECTION_PROMISE = null;
            });
        }
        // connect
        if (state.status === useAuth_utils_1.AuthStatus.Connecting &&
            state.providerType &&
            state.chainId) {
            if (!CONNECTION_PROMISE) {
                CONNECTION_PROMISE = useAuth_utils_1.createConnection(state.providerType, state.chainId);
            }
            Promise.resolve(CONNECTION_PROMISE)
                .then(function (result) {
                if (!cancelled) {
                    if (result.status === useAuth_utils_1.AuthStatus.Connected) {
                        var conn_1 = {
                            account: result.account,
                            providerType: state.providerType,
                            chainId: state.chainId,
                        };
                        segment_1.default(function (analytics, context) {
                            analytics.identify(conn_1.account);
                            analytics.track(useAuth_utils_1.AuthEvent.Connected, __assign(__assign({}, context), conn_1));
                        });
                        rollbar_1.default(function (rollbar) {
                            rollbar.configure({
                                payload: {
                                    person: {
                                        id: conn_1.account,
                                    },
                                },
                            });
                        });
                    }
                    else {
                        result.selecting = state.selecting;
                    }
                    setState(result);
                }
                CONNECTION_PROMISE = null;
            })
                .catch(function (err) {
                CONNECTION_PROMISE = null;
                logger_1.default.error('Error creating session', err);
            });
        }
        // disconnect
        if (state.status === useAuth_utils_1.AuthStatus.Disconnecting &&
            state.providerType === null &&
            state.chainId === null) {
            storage_1.setCurrentIdentity(null);
            ConnectionManager_1.connection.disconnect().catch(function (err) {
                console.error(err);
                rollbar_1.default(function (rollbar) { return rollbar.error(err); });
                segment_1.default(function (analytics) {
                    return analytics.track('error', __assign(__assign({}, err), { message: err.message, stack: err.stack }));
                });
            });
            segment_1.default(function (analytics, context) {
                return analytics.track(useAuth_utils_1.AuthEvent.Disconnected, context);
            });
            rollbar_1.default(function (rollbar) {
                return rollbar.configure({ payload: { person: { id: null } } });
            });
            setState(__assign(__assign({}, useAuth_utils_1.initialState), { status: useAuth_utils_1.AuthStatus.Disconnected }));
        }
        return function () {
            cancelled = true;
        };
    }, [state.status, state.providerType, state.chainId]);
    react_1.useEffect(function () {
        var provider = state.provider;
        var onDisconnect = function () { return disconnect(); };
        var onChainChanged = function (chainId) {
            return setState(__assign(__assign({}, state), { chainId: Number(chainId) }));
        };
        if (provider) {
            provider.on('chainChanged', onChainChanged);
            provider.on('accountsChanged', onDisconnect);
            provider.on('disconnect', onDisconnect);
        }
        return function () {
            if (provider) {
                provider.removeListener('chainChanged', onChainChanged);
                provider.removeListener('accountsChanged', onDisconnect);
                provider.removeListener('disconnect', onDisconnect);
            }
        };
    }, [state.provider]);
    var loading = useAuth_utils_1.isLoading(state.status) || switching;
    return [
        state.account,
        {
            connect: connect,
            disconnect: disconnect,
            switchTo: switchTo,
            select: select,
            loading: loading,
            error: state.error,
            selecting: state.selecting,
            provider: !loading ? state.provider : null,
            providerType: !loading ? state.providerType : null,
            chainId: !loading ? state.chainId : null,
        },
    ];
}
exports.default = useAuth;
