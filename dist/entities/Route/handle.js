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
exports.useMiddlaware = exports.middleware = exports.handleExpressError = exports.handleRaw = exports.handleJSON = exports.handleAPI = void 0;
var context_1 = __importDefault(require("./context"));
var error_1 = __importDefault(require("./error"));
var isStream_1 = __importDefault(require("../../utils/stream/isStream"));
var metrics_1 = require("./metrics");
var logger_1 = __importDefault(require("../Development/logger"));
var DEFAULT_API_HEADERS = {
    'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
};
if (process.env.STRICT_TRANSPORT_SECURITY === 'true') {
    DEFAULT_API_HEADERS['Strict-Transport-Security'] = 'max-age=63072000';
}
exports.default = handleAPI;
function handleAPI(handler) {
    return handleIncommingMessage(handler, {
        defaultHeaders: DEFAULT_API_HEADERS,
        api: true,
    });
}
exports.handleAPI = handleAPI;
function handleJSON(handler) {
    return handleIncommingMessage(handler, {
        defaultHeaders: DEFAULT_API_HEADERS,
        type: 'application/json',
    });
}
exports.handleJSON = handleJSON;
function handleRaw(handler, type) {
    return handleIncommingMessage(handler, { type: type });
}
exports.handleRaw = handleRaw;
function handleExpressError(err, req, res) {
    var data = __assign(__assign({}, err), { message: err.message, stack: err.stack, method: req.method, path: req.path, auth: req.auth, params: req.params, query: req.query, body: req.body });
    logger_1.default.error("error executing request " + req.method + " " + req.path, __assign(__assign({ type: 'http' }, data), { error: err }));
    if (!res.headersSent) {
        res.status(err.statusCode || error_1.default.InternalServerError);
    }
    if (!res.writableFinished) {
        res.json(error_1.default.toJSON(err));
    }
}
exports.handleExpressError = handleExpressError;
function handleIncommingMessage(handler, options) {
    return function (req, res) {
        var _a;
        var labels = {
            method: req.method,
            handler: req.baseUrl + (((_a = req.route) === null || _a === void 0 ? void 0 : _a.path) || ''),
        };
        metrics_1.http_request_pool_size.inc(labels);
        var endTimer = metrics_1.http_request_duration_seconds.startTimer(labels);
        res.on('close', function () {
            endTimer({ statusCode: res.statusCode });
            metrics_1.http_request_pool_size.dec(labels);
        });
        Promise.resolve()
            .then(function () {
            if (options.defaultHeaders) {
                res.set(options.defaultHeaders);
            }
            if (options.api) {
                res.type('application/json');
            }
            else if (options.type) {
                res.type(options.type);
            }
        })
            .then(function () { return handler(req, res, new context_1.default(req, res)); })
            .then(function handleResponseOk(data) {
            if (!res.headersSent) {
                res.status(defaultStatusCode(req));
            }
            if (!res.writableFinished && res !== data) {
                if (isStream_1.default(data)) {
                    return data.pipe(res);
                }
                else {
                    if (options.api) {
                        res.json({ ok: true, data: data });
                    }
                    else if (options.type === 'application/json') {
                        res.json(data);
                    }
                    else {
                        res.send(data);
                    }
                    return data;
                }
            }
        })
            .catch(function (err) { return handleExpressError(err, req, res); });
    };
}
function middleware(handler) {
    return function (req, res, next) {
        handler(req, res, new context_1.default(req, res))
            .then(function () { return next(); })
            .catch(function (err) { return handleExpressError(err, req, res); });
    };
}
exports.middleware = middleware;
/** @deprecated */
function useMiddlaware(middlaware, req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    try {
                        middlaware(req, res, function (err) {
                            err ? reject(err) : resolve();
                        });
                    }
                    catch (error) {
                        reject(error);
                    }
                })];
        });
    });
}
exports.useMiddlaware = useMiddlaware;
function defaultStatusCode(req) {
    switch (req.method) {
        case 'PATCH':
        case 'POST':
        case 'PUT':
            return 201;
        case 'DELETE':
        case 'GET':
        default:
            return 200;
    }
}
