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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Time_1 = __importDefault(require("../utils/date/Time"));
var storage_1 = require("../utils/tx/storage");
var utils_1 = require("decentraland-dapps/dist/modules/transaction/utils");
var txUtils_1 = require("decentraland-dapps/dist/modules/transaction/txUtils");
var rollbar_1 = __importDefault(require("../utils/development/rollbar"));
var segment_1 = __importDefault(require("../utils/development/segment"));
var initialState = [];
function useTransaction(address, chainId) {
    var _a = __read(react_1.useState(initialState), 2), transactions = _a[0], setTransactions = _a[1];
    // re-store tranasctions
    react_1.useEffect(function () {
        if (address && chainId) {
            setTransactions(storage_1.restoreTransactions(address, chainId));
        }
    }, [address, chainId]);
    // track transactions
    react_1.useEffect(function () {
        var closed = false;
        var timer = null;
        function updateTransactions() {
            return __awaiter(this, void 0, void 0, function () {
                var txs, updatedTransactions, _loop_1, txs_1, txs_1_1, tx, e_1_1, pendingTransactions;
                var e_1, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!address || !chainId) {
                                return [2 /*return*/];
                            }
                            txs = transactions || [];
                            updatedTransactions = [];
                            _loop_1 = function (tx) {
                                var updatedTransaction_1, hasChanges;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!utils_1.isPending(tx.status)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, txUtils_1.getTransaction(address, tx.chainId, tx.hash)];
                                        case 1:
                                            updatedTransaction_1 = _a.sent();
                                            if (updatedTransaction_1) {
                                                hasChanges = Object.keys(updatedTransaction_1).some(function (key) {
                                                    return tx[key] !== updatedTransaction_1[key] &&
                                                        String(tx[key]) !== String(updatedTransaction_1[key]);
                                                });
                                                if (hasChanges) {
                                                    updatedTransactions.push(__assign(__assign({}, tx), updatedTransaction_1));
                                                }
                                            }
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            };
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 6, 7, 8]);
                            txs_1 = __values(txs), txs_1_1 = txs_1.next();
                            _b.label = 2;
                        case 2:
                            if (!!txs_1_1.done) return [3 /*break*/, 5];
                            tx = txs_1_1.value;
                            return [5 /*yield**/, _loop_1(tx)];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4:
                            txs_1_1 = txs_1.next();
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_1_1 = _b.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (txs_1_1 && !txs_1_1.done && (_a = txs_1.return)) _a.call(txs_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                            return [7 /*endfinally*/];
                        case 8:
                            if (updatedTransactions.length > 0 && !closed) {
                                txs = storage_1.storeTransactions(address, chainId, updatedTransactions);
                                setTransactions(txs);
                            }
                            pendingTransactions = txs.filter(function (tx) { return utils_1.isPending(tx.status); });
                            if (pendingTransactions.length > 0 && !closed) {
                                timer = setTimeout(updateTransactions, Time_1.default.Second * 2);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        }
        updateTransactions();
        return function () {
            closed = true;
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [transactions]);
    function add(hash, payload) {
        if (payload === void 0) { payload = {}; }
        if (address && chainId) {
            txUtils_1.getTransaction(address, chainId, hash)
                .then(function (tx) {
                if (!tx) {
                    return;
                }
                var newTransaction = __assign(__assign({}, tx), { timestamp: Date.now(), chainId: chainId,
                    payload: payload });
                var txs = storage_1.storeTransactions(address, chainId, [newTransaction]);
                setTransactions(txs);
            })
                .catch(function (err) {
                console.error(err);
                rollbar_1.default(function (rollbar) { return rollbar.error(err); });
                segment_1.default(function (analytics) {
                    return analytics.track('error', __assign(__assign({}, err), { message: err.message, stack: err.stack }));
                });
            });
        }
    }
    function clear() {
        if (!address || !chainId) {
            return;
        }
        setTransactions(initialState);
        storage_1.clearTransactions(address, chainId);
    }
    return [transactions, { add: add, clear: clear }];
}
exports.default = useTransaction;
