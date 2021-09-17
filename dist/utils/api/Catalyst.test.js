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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Catalyst_1 = __importDefault(require("./Catalyst"));
var dcl_crypto_1 = require("dcl-crypto");
var TEST_IDENTITY = {
    ephemeralIdentity: {
        address: '0x84452bbFA4ca14B7828e2F3BBd106A2bD495CD34',
        publicKey: '0x0420c548d960b06dac035d1daf826472eded46b8b9d123294f1199c56fa235c89f2515158b1e3be0874bfb15b42d1551db8c276787a654d0b8d7b4d4356e70fe42',
        privateKey: '0xbc453a92d9baeb3d10294cbc1d48ef6738f718fd31b4eb8085efe7b311299399',
    },
    expiration: new Date('3021-10-16T22:32:29.626Z'),
    authChain: [
        {
            type: dcl_crypto_1.AuthLinkType.SIGNER,
            payload: '0x7949f9f239d1a0816ce5eb364a1f588ae9cc1bf5',
            signature: '',
        },
        {
            type: dcl_crypto_1.AuthLinkType.ECDSA_PERSONAL_EPHEMERAL,
            payload: "Decentraland Login\nEphemeral address: 0x84452bbFA4ca14B7828e2F3BBd106A2bD495CD34\nExpiration: 3021-10-16T22:32:29.626Z",
            signature: '0x39dd4ddf131ad2435d56c81c994c4417daef5cf5998258027ef8a1401470876a1365a6b79810dc0c4a2e9352befb63a9e4701d67b38007d83ffc4cd2b7a38ad51b',
        },
    ],
};
describe('utils/api/Catalyst', function () {
    test("should hava a default prop Url", function () {
        expect(Catalyst_1.default.Url).toBeTruthy();
    });
    describe(".verifySignature()", function () {
        test("should verify authChains created with \"Authenticator.createSimpleAuthChain()\"", function () { return __awaiter(void 0, void 0, void 0, function () {
            var finalPayload, ownerAddress, signature, authChain, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        finalPayload = "Mw485mHs";
                        ownerAddress = TEST_IDENTITY.authChain[0].payload;
                        signature = "0xd8b76035f09faab4e723ce49b9688947b608709f8cd8a70298c10954a4e2bec857d52ee46af53e923c17fea7a6d2cab3144ce10e9960847b37e77323b5c20dcf1b";
                        authChain = dcl_crypto_1.Authenticator.createSimpleAuthChain(finalPayload, TEST_IDENTITY.authChain[0].payload, signature);
                        return [4 /*yield*/, Catalyst_1.default.get().verifySignature(authChain, finalPayload)];
                    case 1:
                        response = _a.sent();
                        expect(response).toEqual({ ownerAddress: ownerAddress, valid: true });
                        return [2 /*return*/];
                }
            });
        }); });
        test("should verify authChains created with \"Authenticator.signPayload()\"", function () { return __awaiter(void 0, void 0, void 0, function () {
            var finalPayload, ownerAddress, authChain, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        finalPayload = 'nz81Djv1';
                        ownerAddress = TEST_IDENTITY.authChain[0].payload;
                        authChain = dcl_crypto_1.Authenticator.signPayload(TEST_IDENTITY, finalPayload);
                        return [4 /*yield*/, Catalyst_1.default.get().verifySignature(authChain, finalPayload)];
                    case 1:
                        response = _a.sent();
                        expect(response).toEqual({ ownerAddress: ownerAddress, valid: true });
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
