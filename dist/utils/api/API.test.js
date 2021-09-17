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
var API_1 = __importDefault(require("./API"));
var fetch_test_1 = __importDefault(require("../../entities/Development/fetch.test"));
require("../../entities/Development/logger.test");
var HTTPBIN_ENDPOINT = process.env.HTTPBIN_ENDPOINT || 'https://httpbin.org';
describe('utils/api/API', function () {
    describe('#catch', function () {
        test('should bypass values for fulfilled Promises', function () { return __awaiter(void 0, void 0, void 0, function () {
            var value, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        value = Math.random();
                        return [4 /*yield*/, API_1.default.catch(Promise.resolve(value))];
                    case 1:
                        result = _a.sent();
                        expect(result).toBe(value);
                        return [2 /*return*/];
                }
            });
        }); });
        test('should return `null` for failed Promises', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, API_1.default.catch(Promise.reject(new Error()))];
                    case 1:
                        result = _a.sent();
                        expect(result).toBe(null);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#url', function () {
        var e_1, _a;
        test('should return root path from base', function () {
            expect(API_1.default.url('')).toBe('/');
            expect(API_1.default.url('/path')).toBe('/path/');
            expect(API_1.default.url('https://decentraland.org')).toBe('https://decentraland.org/');
            expect(API_1.default.url('https://decentraland.org/path')).toBe('https://decentraland.org/path/');
        });
        test('should attach path', function () {
            expect(API_1.default.url('https://decentraland.org/path', '')).toBe('https://decentraland.org/path/');
            expect(API_1.default.url('https://decentraland.org/path', 'target/path')).toBe('https://decentraland.org/path/target/path');
            expect(API_1.default.url('https://decentraland.org/path', '/target/path')).toBe('https://decentraland.org/path/target/path');
            expect(API_1.default.url('https://decentraland.org/path', '/target/path?param1=value1')).toBe('https://decentraland.org/path/target/path?param1=value1');
        });
        test('should attach search params', function () {
            // Empty params
            expect(API_1.default.url('https://decentraland.org/path', '', {})).toBe('https://decentraland.org/path/');
            expect(API_1.default.url('https://decentraland.org/path', 'target/path', {})).toBe('https://decentraland.org/path/target/path');
            expect(API_1.default.url('https://decentraland.org/path', '/target/path', {})).toBe('https://decentraland.org/path/target/path');
            expect(API_1.default.url('https://decentraland.org/path', '/target/path?param1=value1', {})).toBe('https://decentraland.org/path/target/path?param1=value1');
            // Object params
            expect(API_1.default.url('https://decentraland.org/path', '', { param2: 'value2' })).toBe('https://decentraland.org/path/?param2=value2');
            expect(API_1.default.url('https://decentraland.org/path', 'target/path', {
                param2: 'value2',
            })).toBe('https://decentraland.org/path/target/path?param2=value2');
            expect(API_1.default.url('https://decentraland.org/path', '/target/path', {
                param2: 'value2',
            })).toBe('https://decentraland.org/path/target/path?param2=value2');
            expect(API_1.default.url('https://decentraland.org/path', '/target/path?param1=value1', {
                param2: 'value2',
            })).toBe('https://decentraland.org/path/target/path?param1=value1&param2=value2');
            // URL Search Param
            expect(API_1.default.url('https://decentraland.org/path', '', new URLSearchParams({ param2: 'value2' }))).toBe('https://decentraland.org/path/?param2=value2');
            expect(API_1.default.url('https://decentraland.org/path', 'target/path', new URLSearchParams({ param2: 'value2' }))).toBe('https://decentraland.org/path/target/path?param2=value2');
            expect(API_1.default.url('https://decentraland.org/path', '/target/path', new URLSearchParams({ param2: 'value2' }))).toBe('https://decentraland.org/path/target/path?param2=value2');
            expect(API_1.default.url('https://decentraland.org/path', '/target/path?param1=value1', new URLSearchParams({ param2: 'value2' }))).toBe('https://decentraland.org/path/target/path?param1=value1&param2=value2');
        });
        test('.fetch(): http get as default method', function () { return __awaiter(void 0, void 0, void 0, function () {
            var api;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = new API_1.default(HTTPBIN_ENDPOINT);
                        fetch_test_1.default.once('https://httpbin.org/anything', new Response('{}', { status: 200 }));
                        return [4 /*yield*/, api.fetch('/anything')];
                    case 1:
                        _a.sent();
                        expect(fetch_test_1.default.lastUrl()).toBe('https://httpbin.org/anything');
                        expect(fetch_test_1.default.lastOptions()).toEqual({});
                        return [2 /*return*/];
                }
            });
        }); });
        test('.fetch(): http get method', function () { return __awaiter(void 0, void 0, void 0, function () {
            var api;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = new API_1.default(HTTPBIN_ENDPOINT);
                        fetch_test_1.default.once('https://httpbin.org/anything', new Response('{}', { status: 200 }));
                        return [4 /*yield*/, api.fetch('/anything', api.options().method('get'))];
                    case 1:
                        _a.sent();
                        expect(fetch_test_1.default.lastUrl()).toBe('https://httpbin.org/anything');
                        expect(fetch_test_1.default.lastOptions()).toEqual({ method: 'get' });
                        return [2 /*return*/];
                }
            });
        }); });
        test('.fetch(): http delete method', function () { return __awaiter(void 0, void 0, void 0, function () {
            var api;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = new API_1.default(HTTPBIN_ENDPOINT);
                        fetch_test_1.default.once('https://httpbin.org/anything', new Response('{}', { status: 200 }));
                        return [4 /*yield*/, api.fetch('/anything', api.options().method('delete'))];
                    case 1:
                        _a.sent();
                        expect(fetch_test_1.default.lastUrl()).toBe('https://httpbin.org/anything');
                        expect(fetch_test_1.default.lastOptions()).toEqual({ method: 'delete' });
                        return [2 /*return*/];
                }
            });
        }); });
        var _loop_1 = function (method) {
            test(".fetch(): http " + method + " method", function () { return __awaiter(void 0, void 0, void 0, function () {
                var api;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            api = new API_1.default(HTTPBIN_ENDPOINT);
                            fetch_test_1.default.once('https://httpbin.org/anything', new Response('{}', { status: 200 }));
                            return [4 /*yield*/, api.fetch('/anything', api.options().method(method))];
                        case 1:
                            _a.sent();
                            expect(fetch_test_1.default.lastUrl()).toBe('https://httpbin.org/anything');
                            expect(fetch_test_1.default.lastOptions()).toEqual({ method: method });
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        try {
            for (var _b = __values([
                'get',
                'post',
                'put',
                'patch',
                'delete',
                'head',
                'options',
            ]), _c = _b.next(); !_c.done; _c = _b.next()) {
                var method = _c.value;
                _loop_1(method);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
});
