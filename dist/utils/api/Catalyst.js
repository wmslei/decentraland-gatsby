"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var random_1 = __importDefault(require("../number/random"));
var env_1 = __importDefault(require("../env"));
var API_1 = __importDefault(require("./API"));
var rollbar_1 = __importDefault(require("../development/rollbar"));
var segment_1 = __importDefault(require("../development/segment"));
var Catalyst = /** @class */ (function (_super) {
    __extends(Catalyst, _super);
    function Catalyst() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.available = null;
        return _this;
    }
    Catalyst.get = function () {
        return this.from(env_1.default('PROFILE_URL', this.Url));
    };
    Catalyst.getAny = function () {
        return __awaiter(this, void 0, void 0, function () {
            var instances, index, instance, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.Servers) {
                            this.Servers = this.get()
                                .getServers()
                                .then(function (servers) {
                                var e_1, _a;
                                try {
                                    for (var servers_1 = __values(servers), servers_1_1 = servers_1.next(); !servers_1_1.done; servers_1_1 = servers_1.next()) {
                                        var server = servers_1_1.value;
                                        _this.Cache.set(server.address, new Catalyst(server.address));
                                    }
                                }
                                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                finally {
                                    try {
                                        if (servers_1_1 && !servers_1_1.done && (_a = servers_1.return)) _a.call(servers_1);
                                    }
                                    finally { if (e_1) throw e_1.error; }
                                }
                            });
                        }
                        return [4 /*yield*/, this.Servers];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!this.Cache.size) return [3 /*break*/, 5];
                        instances = Array.from(this.Cache.values());
                        index = random_1.default(instances.length);
                        if (!instances[index]) return [3 /*break*/, 4];
                        instance = instances[index];
                        if (instance.available) {
                            return [2 /*return*/, instance];
                        }
                        return [4 /*yield*/, API_1.default.catch(instance.getStatus())];
                    case 3:
                        result = _a.sent();
                        if (result) {
                            instance.available = true;
                            return [2 /*return*/, instance];
                        }
                        this.Cache.delete(instance.baseUrl);
                        _a.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, this.get()];
                }
            });
        });
    };
    Catalyst.from = function (baseUrl) {
        if (!this.Cache.has(baseUrl)) {
            this.Cache.set(baseUrl, new Catalyst(baseUrl));
        }
        return this.Cache.get(baseUrl);
    };
    Catalyst.prototype.getProfile = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch("/lambdas/profile/" + address.toString().toLowerCase())];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, (result && result.avatars && result.avatars[0]) || null];
                }
            });
        });
    };
    /**
     * loads profile data in parallel
     *
     * @param addresses - profile addresses list
     * @returns array of profiles in the same order used in the addresses param,
     *  if the profile doesn't exists the array will include a `null` in the corresponding
     *  position
     *
     * @example
     * ```typescript
     * getProfiles([ `0x1234...`, 0x00000 ]) => Promise<[ { user: `0x1234...`, ...profile }, null ]>
     * ```
     */
    Catalyst.prototype.getProfiles = function (addresses) {
        return __awaiter(this, void 0, void 0, function () {
            var params, addresses_1, addresses_1_1, address, results, map;
            var e_2, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (addresses.length === 0) {
                            return [2 /*return*/, []];
                        }
                        params = new URLSearchParams();
                        try {
                            for (addresses_1 = __values(addresses), addresses_1_1 = addresses_1.next(); !addresses_1_1.done; addresses_1_1 = addresses_1.next()) {
                                address = addresses_1_1.value;
                                params.append('id', address.toString().toLowerCase());
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (addresses_1_1 && !addresses_1_1.done && (_a = addresses_1.return)) _a.call(addresses_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        return [4 /*yield*/, this.fetch("/lambdas/profiles/?" + params.toString())];
                    case 1:
                        results = _b.sent();
                        map = new Map(results
                            .filter(function (result) {
                            var avatar = result.avatars[0];
                            if (!avatar.ethAddress) {
                                rollbar_1.default(function (logger) {
                                    return logger.error("Error loading profiles", {
                                        avatar: avatar,
                                        addresses: addresses,
                                        server: _this.baseUrl,
                                    });
                                });
                                segment_1.default(function (analytics) {
                                    return analytics.track('error', {
                                        message: "Error loading profiles",
                                        server: _this.baseUrl,
                                        addresses: addresses,
                                        avatar: avatar,
                                    });
                                });
                                return false;
                            }
                            return true;
                        })
                            .map(function (result) {
                            var avatar = result.avatars[0];
                            return [avatar.ethAddress.toLowerCase(), avatar];
                        }));
                        return [2 /*return*/, addresses.map(function (address) { return map.get(address.toString().toLowerCase()) || null; })];
                }
            });
        });
    };
    Catalyst.prototype.getStatus = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getCommsStatus(options)];
            });
        });
    };
    Catalyst.prototype.getCommsStatus = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var params, target;
            return __generator(this, function (_a) {
                params = new URLSearchParams();
                if (options) {
                    if (typeof options === 'boolean') {
                        params.append('includeLayers', 'true');
                    }
                    else if (typeof options === 'object') {
                        if (options.includeLayers) {
                            params.append('includeLayers', 'true');
                        }
                        else if (options.includeUsersParcels) {
                            params.append('includeUsersParcels', 'true');
                        }
                    }
                }
                target = '/comms/status';
                if (params.toString()) {
                    target += '?' + params.toString();
                }
                return [2 /*return*/, this.fetch(target)];
            });
        });
    };
    Catalyst.prototype.getLambdasStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetch('/lambdas/status')];
            });
        });
    };
    Catalyst.prototype.getContentStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetch('/content/status')];
            });
        });
    };
    Catalyst.prototype.getContentUrl = function (hash) {
        return this.url("/content/contents/" + hash);
    };
    Catalyst.prototype.getEntityScenes = function (pointers) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                if (!pointers || pointers.length === 0) {
                    return [2 /*return*/, []];
                }
                params = pointers
                    .map(function (point) {
                    return ('pointer=' +
                        (Array.isArray(point) ? point.slice(0, 2).join(',') : point));
                })
                    .join('&');
                return [2 /*return*/, this.fetch('/content/entities/scene?' + params)];
            });
        });
    };
    Catalyst.prototype.getServers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetch("/lambdas/contracts/servers")];
            });
        });
    };
    Catalyst.prototype.getPOIs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var results, pois, results_1, results_1_1, result, _a, x, y;
            var e_3, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.fetch("/lambdas/contracts/pois")];
                    case 1:
                        results = _c.sent();
                        pois = [];
                        try {
                            for (results_1 = __values(results), results_1_1 = results_1.next(); !results_1_1.done; results_1_1 = results_1.next()) {
                                result = results_1_1.value;
                                _a = __read(String(result || '')
                                    .split(',')
                                    .map(Number), 2), x = _a[0], y = _a[1];
                                if (Number.isFinite(x) && Number.isFinite(y)) {
                                    pois.push([x, y]);
                                }
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (results_1_1 && !results_1_1.done && (_b = results_1.return)) _b.call(results_1);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        return [2 /*return*/, pois];
                }
            });
        });
    };
    Catalyst.prototype.getBanNames = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetch("/lambdas/contracts/denylisted-names")];
            });
        });
    };
    /**
     * @deprecated by the archipelago update
     * @see https://decentraland.org/blog/project-updates/communication-protocol-improvements/
     * @see https://github.com/decentraland/adr/blob/main/docs/ADR-35-coms-protocol-optimizations.md
     */
    Catalyst.prototype.getLayers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetch('/comms/layers')];
            });
        });
    };
    /**
     * @deprecated by the archipelago update
     * @see https://decentraland.org/blog/project-updates/communication-protocol-improvements/
     * @see https://github.com/decentraland/adr/blob/main/docs/ADR-35-coms-protocol-optimizations.md
     */
    Catalyst.prototype.getLayerUsers = function (layer) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetch("/comms/layers/" + layer + "/users")];
            });
        });
    };
    Catalyst.prototype.verifySignature = function (authChain, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetch("/lambdas/crypto/validate-signature", this.options().method('POST').json({ authChain: authChain, timestamp: message }))];
            });
        });
    };
    Catalyst.Url = process.env.GATSBY_CATALYST_API ||
        process.env.REACT_APP_CATALYST_API ||
        process.env.STORYBOOK_CATALYST_API ||
        process.env.CATALYST_API ||
        process.env.GATSBY_PROFILE_URL ||
        process.env.REACT_APP_PROFILE_URL ||
        process.env.STORYBOOK_PROFILE_URL ||
        process.env.PROFILE_URL ||
        'https://peer-lb.decentraland.org';
    Catalyst.Servers = null;
    Catalyst.Cache = new Map();
    return Catalyst;
}(API_1.default));
exports.default = Catalyst;
