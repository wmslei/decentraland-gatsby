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
exports.fetchManaBalance = void 0;
var chainConfiguration_1 = require("decentraland-dapps/dist/lib/chainConfiguration");
var isEthereumAddress_1 = __importDefault(require("validator/lib/isEthereumAddress"));
var units_1 = require("web3x/utils/units");
var rollbar_1 = __importDefault(require("../development/rollbar"));
var segment_1 = __importDefault(require("../development/segment"));
var Loader_1 = __importDefault(require("./Loader"));
var QUERY = "\nquery ($address: String!) {\n  accounts(where: { id: $address }) {\n    id,\n    mana\n  }\n}\n";
function fetchManaBalance(address, chainId) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var response, body, accounts, account, mana, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!isEthereumAddress_1.default(address)) {
                        return [2 /*return*/, 0];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(chainConfiguration_1.MANA_GRAPH_BY_CHAIN_ID[chainId], {
                            method: 'post',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                query: QUERY,
                                variables: { address: address.toLowerCase() },
                            }),
                        })];
                case 2:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    body = _b.sent();
                    accounts = ((_a = body === null || body === void 0 ? void 0 : body.data) === null || _a === void 0 ? void 0 : _a.accounts) || [];
                    account = accounts[0];
                    mana = (account === null || account === void 0 ? void 0 : account.mana) || '0';
                    return [2 /*return*/, parseFloat(units_1.fromWei(mana, 'ether'))];
                case 4:
                    err_1 = _b.sent();
                    console.error(err_1);
                    rollbar_1.default(function (rollbar) { return rollbar.error(err_1); });
                    segment_1.default(function (analytics) {
                        return analytics.track('error', __assign(__assign({}, err_1), { message: err_1.message, stack: err_1.stack }));
                    });
                    return [2 /*return*/, 0];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.fetchManaBalance = fetchManaBalance;
function createBalanceLoader(chainId) {
    var _this = this;
    return new Loader_1.default(function (address) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetchManaBalance(address, chainId)];
        });
    }); });
}
var cache = new Map();
function manaBalance(chainId) {
    if (!cache.has(chainId)) {
        cache.set(chainId, createBalanceLoader(chainId));
    }
    return cache.get(chainId);
}
exports.default = manaBalance;
