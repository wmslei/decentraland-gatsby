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
var bn_1 = require("web3x/utils/bn");
var API_1 = __importDefault(require("./API"));
var env_1 = __importDefault(require("../env"));
var Options_1 = __importDefault(require("./Options"));
var CLEAR_LOW = bn_1.toBN('0xffffffffffffffffffffffffffffffff00000000000000000000000000000000');
var CLEAR_HIGH = bn_1.toBN('0x00000000000000000000000000000000ffffffffffffffffffffffffffffffff');
var FACTOR = bn_1.toBN('0x100000000000000000000000000000000');
var FACTOR_LOW = bn_1.toBN('0x10000000000000000000000000000000000000000000000000000000000000000');
var REVERSE_FACTOR = bn_1.toBN('0x1000000000000000000000000000000');
var Land = /** @class */ (function (_super) {
    __extends(Land, _super);
    function Land() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Land.get = function () {
        return this.from(env_1.default('LAND_URL', this.Url));
    };
    Land.from = function (baseUrl) {
        if (!this.Cache.has(baseUrl)) {
            this.Cache.set(baseUrl, new Land(baseUrl));
        }
        return this.Cache.get(baseUrl);
    };
    Land.encodeParcelId = function (coordinates) {
        var _a = __read(coordinates, 2), x = _a[0], y = _a[1];
        if (!Number.isFinite(x) ||
            !Number.isFinite(y) ||
            -1000000 >= x ||
            x >= 1000000 ||
            -1000000 >= y ||
            y >= 1000000) {
            throw new RangeError("The coordinates should be inside bounds");
        }
        var absX = bn_1.toBN(Math.abs(x));
        var absY = bn_1.toBN(Math.abs(y));
        var uintX = x < 0 ? FACTOR_LOW.sub(absX) : absX;
        var uintY = y < 0 ? FACTOR.sub(absY) : absY;
        var bX = bn_1.toBN(uintX).mul(FACTOR).and(CLEAR_LOW);
        var bY = bn_1.toBN(uintY).and(CLEAR_HIGH);
        return bX.or(bY).toString();
    };
    Land.decodeParcelId = function (parcelId) {
        var bn = bn_1.toBN(parcelId);
        var bnX = bn.div(FACTOR);
        var bnY = bn.mod(FACTOR);
        var x = bnX.gte(REVERSE_FACTOR)
            ? bnX.sub(FACTOR).toNumber()
            : bnX.toNumber();
        var y = bnY.gte(REVERSE_FACTOR)
            ? bnY.sub(FACTOR).toNumber()
            : bnY.toNumber();
        if (!Number.isFinite(x) ||
            !Number.isFinite(y) ||
            -1000000 >= x ||
            x >= 1000000 ||
            -1000000 >= y ||
            y >= 1000000) {
            throw new RangeError("The coordinates should be inside bounds");
        }
        return [x, y];
    };
    Land.prototype.fetch = function (url, options) {
        if (options === void 0) { options = new Options_1.default({}); }
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.fetch.call(this, url, options)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    Land.prototype.getPositionName = function (position) {
        return __awaiter(this, void 0, void 0, function () {
            var tile, parcel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTile(position)];
                    case 1:
                        tile = _a.sent();
                        if (tile && tile.name && tile.name !== 'Roads') {
                            return [2 /*return*/, tile.name];
                        }
                        return [4 /*yield*/, this.getParcel(position)];
                    case 2:
                        parcel = _a.sent();
                        if (parcel &&
                            parcel.name &&
                            parcel.name !== "Parcel " + position.join(',')) {
                            return [2 /*return*/, parcel.name];
                        }
                        return [2 /*return*/, 'Decentraland'];
                }
            });
        });
    };
    Land.prototype.getParcel = function (position) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, x, y;
            return __generator(this, function (_b) {
                _a = __read(position, 2), x = _a[0], y = _a[1];
                return [2 /*return*/, this.fetch("/v2/parcels/" + x + "/" + y)];
            });
        });
    };
    Land.prototype.getEstate = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetch("/v2/estates/" + id)];
            });
        });
    };
    Land.prototype.getParcels = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var sort_by, sort_order;
            return __generator(this, function (_a) {
                sort_by = options.sortBy, sort_order = options.sortOrder;
                return [2 /*return*/, this.fetch("/v2/parcels" + this.query(__assign(__assign({}, options), { sort_by: sort_by, sort_order: sort_order })))];
            });
        });
    };
    Land.prototype.getEstates = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var sort_by, sort_order;
            return __generator(this, function (_a) {
                sort_by = options.sortBy, sort_order = options.sortOrder;
                return [2 /*return*/, this.fetch("/v2/estates" + this.query(__assign(__assign({}, options), { sort_by: sort_by, sort_order: sort_order })))];
            });
        });
    };
    /** @deprecated */
    Land.prototype.getMapContent = function (nw, se) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Endpoint /v1/map is deprecated");
            });
        });
    };
    /**
     * Get a map of tiles
     * @param position1
     * @param position2
     * @param options
     * @returns
     */
    Land.prototype.getTiles = function (position1, position2, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = new URLSearchParams({
                    x1: String(position1[0]),
                    y1: String(position1[1]),
                    x2: String(position2[0]),
                    y2: String(position2[1]),
                });
                if (options.include && options.include.length > 0) {
                    params.append('include', options.include.join(','));
                }
                if (options.exclude && options.exclude.length > 0) {
                    params.append('include', options.exclude.join(','));
                }
                return [2 /*return*/, this.fetch("/v2/tiles?" + params.toString())];
            });
        });
    };
    Land.prototype.getTile = function (position, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tiles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTiles(position, position, options)];
                    case 1:
                        tiles = _a.sent();
                        return [2 /*return*/, tiles[position.join(',')] || null];
                }
            });
        });
    };
    Land.prototype.encodeParcelId = function (coordinates) {
        return Land.encodeParcelId(coordinates);
    };
    Land.prototype.decodeParcelId = function (parcelId) {
        return Land.decodeParcelId(parcelId);
    };
    Land.prototype.getImage = function (options) {
        if (options === void 0) { options = {}; }
        var rawSelected = options.selected;
        var selected = rawSelected && rawSelected.map(function (position) { return position.join(','); }).join(';');
        return this.url("/v1/map.png" + this.query(__assign(__assign({}, options), { selected: selected })));
    };
    Land.prototype.getParcelImage = function (coordinates, options) {
        if (options === void 0) { options = {}; }
        var _a = __read(coordinates, 2), x = _a[0], y = _a[1];
        return this.url("/v1/parcels/" + x + "/" + y + "/map.png" + this.query(options));
    };
    Land.prototype.getEstateImage = function (id, options) {
        if (options === void 0) { options = {}; }
        return this.url("/v1/estates/" + id + "/map.png" + this.query(options));
    };
    Land.Url = process.env.GATSBY_LAND_API ||
        process.env.REACT_APP_LAND_API ||
        process.env.STORYBOOK_LAND_API ||
        process.env.LAND_API ||
        process.env.GATSBY_LAND_URL ||
        process.env.REACT_APP_LAND_URL ||
        process.env.STORYBOOK_LAND_URL ||
        process.env.LAND_URL ||
        'https://api.decentraland.org';
    Land.Cache = new Map();
    return Land;
}(API_1.default));
exports.default = Land;
