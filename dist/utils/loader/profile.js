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
exports.createDefaultProfile = void 0;
var Catalyst_1 = __importDefault(require("../api/Catalyst"));
var rollbar_1 = __importDefault(require("../development/rollbar"));
var segment_1 = __importDefault(require("../development/segment"));
var BatchLoader_1 = __importDefault(require("./BatchLoader"));
var DEFAULT_AVATAR = 'https://decentraland.org/images/male.png';
exports.createDefaultProfile = function (address) { return ({
    userId: address,
    ethAddress: address,
    hasClaimedName: false,
    avatar: {
        snapshots: {
            face: DEFAULT_AVATAR,
            body: '',
        },
        bodyShape: 'dcl://base-avatars/BaseMale',
        eyes: {
            color: {
                r: 0.125,
                g: 0.703125,
                b: 0.96484375,
            },
        },
        hair: {
            color: {
                r: 0.234375,
                g: 0.12890625,
                b: 0.04296875,
            },
        },
        skin: {
            color: {
                r: 0.94921875,
                g: 0.76171875,
                b: 0.6484375,
            },
        },
        wearables: [
            'dcl://base-avatars/green_hoodie',
            'dcl://base-avatars/brown_pants',
            'dcl://base-avatars/sneakers',
            'dcl://base-avatars/casual_hair_01',
            'dcl://base-avatars/beard',
        ],
        version: 0,
    },
    name: '',
    email: '',
    description: '',
    blocked: [],
    inventory: [],
    version: 0,
    tutorialStep: 0,
    isDefaultProfile: true,
}); };
exports.default = new BatchLoader_1.default(function (addresses) { return __awaiter(void 0, void 0, void 0, function () {
    var profiles, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Catalyst_1.default.get().getProfiles(addresses.map(function (address) { return address.toLowerCase(); }))];
            case 1:
                profiles = _a.sent();
                return [2 /*return*/, profiles.map(function (profile, i) { return profile || exports.createDefaultProfile(addresses[i]); })];
            case 2:
                err_1 = _a.sent();
                console.error(err_1);
                rollbar_1.default(function (rollbar) { return rollbar.error(err_1); });
                segment_1.default(function (analytics) {
                    return analytics.track('error', __assign(__assign({}, err_1), { message: err_1.message, stack: err_1.stack }));
                });
                return [2 /*return*/, addresses.map(function (address) { return exports.createDefaultProfile(address); })];
            case 3: return [2 /*return*/];
        }
    });
}); }, { maxBatchSize: 100 });
