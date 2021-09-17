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
exports.ownerAddress = void 0;
var EmptyAccountsError_1 = __importDefault(require("../errors/EmptyAccountsError"));
var once_1 = __importDefault(require("../function/once"));
var rollbar_1 = __importDefault(require("../development/rollbar"));
var segment_1 = __importDefault(require("../development/segment"));
var dependencies = once_1.default(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, Promise.all([
                Promise.resolve().then(function () { return __importStar(require('web3x/address')); }),
                Promise.resolve().then(function () { return __importStar(require('web3x/account')); }),
                Promise.resolve().then(function () { return __importStar(require('web3x/personal')); }),
                Promise.resolve().then(function () { return __importStar(require('web3x/utils/hex-buffer')); }),
                Promise.resolve().then(function () { return __importStar(require('dcl-crypto/dist/Authenticator')); }),
            ])];
    });
}); });
function identify(connection) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, Address_1, Account, Personal_1, bufferToHex, Authenticator, address_1, provider_1, account, expiration, payload, identity, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    if (!connection.account) {
                        throw new EmptyAccountsError_1.default();
                    }
                    return [4 /*yield*/, dependencies()];
                case 1:
                    _a = __read.apply(void 0, [_b.sent(), 5]), Address_1 = _a[0].Address, Account = _a[1].Account, Personal_1 = _a[2].Personal, bufferToHex = _a[3].bufferToHex, Authenticator = _a[4].Authenticator;
                    address_1 = connection.account;
                    provider_1 = connection.provider;
                    account = Account.create();
                    expiration = 60 * 24 * 30;
                    payload = {
                        address: account.address.toString(),
                        publicKey: bufferToHex(account.publicKey),
                        privateKey: bufferToHex(account.privateKey),
                    };
                    return [4 /*yield*/, Authenticator.initializeAuthChain(address_1, payload, expiration, function (message) {
                            return new Personal_1(provider_1).sign(message, Address_1.fromString(address_1), '');
                        })];
                case 2:
                    identity = _b.sent();
                    return [2 /*return*/, identity];
                case 3:
                    err_1 = _b.sent();
                    console.error(err_1);
                    rollbar_1.default(function (rollbar) { return rollbar.error(err_1); });
                    segment_1.default(function (analytics) {
                        return analytics.track('error', __assign(__assign({}, err_1), { message: err_1.message, stack: err_1.stack }));
                    });
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.default = identify;
function ownerAddress(authChain) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, Authenticator;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, dependencies()];
                case 1:
                    _a = __read.apply(void 0, [_b.sent(), 5]), Authenticator = _a[4].Authenticator;
                    return [2 /*return*/, Authenticator.ownerAddress(authChain).toLowerCase()];
            }
        });
    });
}
exports.ownerAddress = ownerAddress;
