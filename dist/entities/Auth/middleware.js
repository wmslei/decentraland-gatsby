"use strict";
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
exports.withBearerToken = exports.auth = void 0;
var configuration_1 = require("decentraland-connect/dist/configuration");
var types_1 = require("dcl-crypto/dist/types");
var Authenticator_1 = require("dcl-crypto/dist/Authenticator");
var base64_1 = require("../../utils/string/base64");
var providers_1 = require("web3x/providers");
var error_1 = __importDefault(require("../Route/error"));
var handle_1 = require("../Route/handle");
var logger_1 = __importDefault(require("../Development/logger"));
var once_1 = __importDefault(require("../../utils/function/once"));
var ensBalance_1 = require("../../utils/loader/ensBalance");
var getProvider = once_1.default(function () {
    var configuration = configuration_1.getConfiguration();
    var provider = new providers_1.HttpProvider(configuration.wallet_connect.urls[ensBalance_1.ChainId.ETHEREUM_MAINNET]);
    return provider;
});
function auth(options) {
    var _this = this;
    if (options === void 0) { options = {}; }
    return handle_1.middleware(function (req) { return __awaiter(_this, void 0, void 0, function () {
        var authorization, _a, type, token, ephemeralAddress, authChain, data, identity, ephemeralPayloadLink, ephemeralPayload, result, error_2, auth;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    authorization = req.header('authorization');
                    if (!authorization && options.optional) {
                        return [2 /*return*/];
                    }
                    else if (!authorization) {
                        throw new error_1.default("Unauthorized", error_1.default.Unauthorized);
                    }
                    _a = __read(authorization.split(' '), 2), type = _a[0], token = _a[1];
                    if (type.toLowerCase() !== 'bearer' && options.allowInvalid) {
                        return [2 /*return*/];
                    }
                    else if (type.toLowerCase() !== 'bearer') {
                        throw new error_1.default("Invalid authorization type: \"" + type + "\"", error_1.default.Unauthorized);
                    }
                    try {
                        data = base64_1.fromBase64(token);
                        identity = JSON.parse(data);
                        authChain = Array.isArray(identity) ? identity : identity.authChain;
                        ephemeralPayloadLink = authChain.find(function (link) {
                            return [
                                types_1.AuthLinkType.ECDSA_PERSONAL_EPHEMERAL,
                                types_1.AuthLinkType.ECDSA_EIP_1654_EPHEMERAL,
                            ].includes(link.type);
                        });
                        ephemeralPayload = Authenticator_1.parseEmphemeralPayload((ephemeralPayloadLink && ephemeralPayloadLink.payload) || '');
                        ephemeralAddress = ephemeralPayload.ephemeralAddress;
                    }
                    catch (error) {
                        logger_1.default.error("Error decoding authChain", error);
                        if (options.allowInvalid) {
                            return [2 /*return*/];
                        }
                        else {
                            throw new error_1.default("Invalid authorization token", error_1.default.Unauthorized);
                        }
                    }
                    result = { ok: false };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Authenticator_1.Authenticator.validateSignature(ephemeralAddress, authChain, getProvider())];
                case 2:
                    result = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    logger_1.default.error(error_2);
                    if (options.allowInvalid) {
                        return [2 /*return*/];
                    }
                    else {
                        throw new error_1.default("Invalid authorization token sign", error_1.default.Unauthorized);
                    }
                    return [3 /*break*/, 4];
                case 4:
                    if (!result.ok && options.allowInvalid) {
                        return [2 /*return*/];
                    }
                    else if (!result.ok) {
                        throw new error_1.default(result.message || 'Invalid authorization data', error_1.default.Forbidden);
                    }
                    auth = Authenticator_1.Authenticator.ownerAddress(authChain).toLowerCase();
                    Object.assign(req, { auth: auth });
                    return [2 /*return*/];
            }
        });
    }); });
}
exports.auth = auth;
function withBearerToken(tokens) {
    var _this = this;
    return handle_1.middleware(function (req) { return __awaiter(_this, void 0, void 0, function () {
        var authorization, auth;
        return __generator(this, function (_a) {
            authorization = req.headers.authorization;
            if (!authorization) {
                throw new error_1.default('Missing Authorization', error_1.default.Unauthorized);
            }
            if (!authorization.startsWith('Bearer ')) {
                throw new error_1.default("Ivalid Authorization", error_1.default.BadRequest);
            }
            auth = authorization.slice('Bearer '.length);
            if (!tokens.includes(auth)) {
                throw new error_1.default('Unauthorized', error_1.default.Unauthorized);
            }
            Object.assign(req, { auth: auth.slice(0, 10) });
            return [2 /*return*/];
        });
    }); });
}
exports.withBearerToken = withBearerToken;
