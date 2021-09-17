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
exports.redirectTo = exports.redirectToBody = exports.redirectToFace = exports.getProfile = void 0;
var isEthereumAddress_1 = __importDefault(require("validator/lib/isEthereumAddress"));
var isURL_1 = __importDefault(require("validator/lib/isURL"));
var API_1 = __importDefault(require("../../utils/api/API"));
var Catalyst_1 = __importDefault(require("../../utils/api/Catalyst"));
var profile_1 = require("../../utils/loader/profile");
var routes_1 = __importDefault(require("../Route/routes"));
var DEFAULT_AVATAR = 'https://decentraland.org/images/male.png';
var TTL_AVATAR = 86400;
exports.default = routes_1.default(function (router) {
    router.get('/profile/:user/face.png', redirectToFace);
    router.get('/profile/:user/body.png', redirectToBody);
});
var cache = new Map();
function getProfile(req) {
    return __awaiter(this, void 0, void 0, function () {
        var user, profileCache, _a, profile_2, ttl, handler, _b, profile;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    user = String(req.params.user).toLowerCase();
                    // invalid user
                    if (!isEthereumAddress_1.default(user)) {
                        return [2 /*return*/, profile_1.createDefaultProfile(user)];
                    }
                    profileCache = cache.get(user);
                    if (!profileCache) return [3 /*break*/, 2];
                    return [4 /*yield*/, profileCache];
                case 1:
                    _a = __read.apply(void 0, [_c.sent(), 2]), profile_2 = _a[0], ttl = _a[1];
                    if (Date.now() < ttl) {
                        if (profile_2) {
                            return [2 /*return*/, profile_2];
                        }
                        else {
                            return [2 /*return*/, profile_1.createDefaultProfile(user)];
                        }
                    }
                    _c.label = 2;
                case 2:
                    handler = API_1.default.catch(Catalyst_1.default.get().getProfiles([user]))
                        .then(function (profiles) { return (profiles && profiles[0]) || null; })
                        .then(function (profile) {
                        return [profile, Date.now() + TTL_AVATAR * 1000];
                    });
                    cache.set(user, handler);
                    return [4 /*yield*/, handler];
                case 3:
                    _b = __read.apply(void 0, [_c.sent(), 1]), profile = _b[0];
                    if (profile) {
                        return [2 /*return*/, profile];
                    }
                    return [2 /*return*/, profile_1.createDefaultProfile(user)];
            }
        });
    });
}
exports.getProfile = getProfile;
function redirectToFace(req, res) {
    getProfile(req).then(function (profile) { var _a, _b; return redirectTo(res, (_b = (_a = profile.avatar) === null || _a === void 0 ? void 0 : _a.snapshots) === null || _b === void 0 ? void 0 : _b.face); });
}
exports.redirectToFace = redirectToFace;
function redirectToBody(req, res) {
    getProfile(req).then(function (profile) { var _a, _b; return redirectTo(res, (_b = (_a = profile.avatar) === null || _a === void 0 ? void 0 : _a.snapshots) === null || _b === void 0 ? void 0 : _b.face); });
}
exports.redirectToBody = redirectToBody;
function redirectTo(res, url) {
    if (typeof url !== 'string' || !isURL_1.default(url)) {
        url = DEFAULT_AVATAR;
    }
    res.setHeader('Cache-Control', 'max-age=' + TTL_AVATAR);
    res.redirect(302, url);
}
exports.redirectTo = redirectTo;
