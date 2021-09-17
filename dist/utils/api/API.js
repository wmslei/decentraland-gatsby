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
var logger_1 = __importDefault(require("../../entities/Development/logger"));
var FetchError_1 = __importDefault(require("../errors/FetchError"));
var RequestError_1 = __importDefault(require("../errors/RequestError"));
var Options_1 = __importDefault(require("./Options"));
require("isomorphic-fetch");
var API = /** @class */ (function () {
    function API(baseUrl, defaultOptions) {
        if (baseUrl === void 0) { baseUrl = ''; }
        if (defaultOptions === void 0) { defaultOptions = new Options_1.default({}); }
        this.baseUrl = '';
        this.defaultOptions = new Options_1.default({});
        this.baseUrl = baseUrl || '';
        this.defaultOptions = defaultOptions;
    }
    API.catch = function (prom) {
        return prom.catch(function (err) {
            logger_1.default.error(err);
            return null;
        });
    };
    API.url = function (base, path, query) {
        if (path === void 0) { path = ''; }
        if (query === void 0) { query = {}; }
        if (base.endsWith('/')) {
            base = base.slice(0, -1);
        }
        if (!path.startsWith('/')) {
            path = '/' + path;
        }
        var params = new URLSearchParams(query).toString();
        if (params) {
            if (path.includes('?')) {
                params = '&' + params;
            }
            else {
                params = '?' + params;
            }
        }
        return base + path + params;
    };
    API.prototype.url = function (path, query) {
        if (query === void 0) { query = {}; }
        return API.url(this.baseUrl, path, query);
    };
    API.prototype.options = function (options) {
        if (options === void 0) { options = {}; }
        return new Options_1.default(options);
    };
    API.prototype.query = function (qs) {
        var e_1, _a;
        if (!qs) {
            return '';
        }
        var params = new URLSearchParams();
        try {
            for (var _b = __values(Object.keys(qs)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                if (qs[key] === null) {
                    params.set(key, '');
                }
                else if (qs[key] !== undefined) {
                    params.set(key, qs[key]);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var queryString = params.toString();
        if (!queryString) {
            return '';
        }
        return '?' + queryString;
    };
    API.prototype.fetch = function (path, options) {
        if (options === void 0) { options = new Options_1.default({}); }
        return __awaiter(this, void 0, void 0, function () {
            var res, body, json, url, opt, error_1, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = '';
                        json = null;
                        url = this.url(path);
                        opt = this.defaultOptions.merge(options);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fetch(url, opt.toObject())];
                    case 2:
                        res = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error();
                        throw new FetchError_1.default(url, opt.toObject(), error_1.message);
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, res.text()];
                    case 5:
                        body = _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        throw new RequestError_1.default(url, opt.toObject(), res, body);
                    case 7:
                        try {
                            json = JSON.parse(body || '{}');
                        }
                        catch (error) {
                            throw new RequestError_1.default(url, opt.toObject(), res, error.message + ' at ' + body);
                        }
                        if (res.status >= 400) {
                            throw new RequestError_1.default(url, opt.toObject(), res, json);
                        }
                        return [2 /*return*/, json];
                }
            });
        });
    };
    return API;
}());
exports.default = API;
