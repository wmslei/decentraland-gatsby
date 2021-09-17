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
exports.withSecurityHeaders = exports.withDDosProtection = exports.withLogs = exports.withCors = exports.withBody = void 0;
var express_1 = require("express");
var body_parser_1 = __importDefault(require("body-parser"));
var ddos_1 = __importDefault(require("ddos"));
var cors_1 = __importDefault(require("cors"));
var handle_1 = require("./handle");
var types_1 = require("./types");
var error_1 = __importDefault(require("./error"));
var logger_1 = __importDefault(require("../Development/logger"));
function withBody(options) {
    if (options === void 0) { options = {}; }
    var router = express_1.Router();
    if (options.urlencode !== false) {
        router.use(body_parser_1.default.urlencoded({ extended: false }));
    }
    if (options.json !== false) {
        router.use(body_parser_1.default.json());
    }
    return router;
}
exports.withBody = withBody;
function withCors(options) {
    if (options === void 0) { options = {}; }
    return cors_1.default(types_1.createCorsOptions(options));
}
exports.withCors = withCors;
function withLogs() {
    var _this = this;
    return handle_1.middleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var start;
        return __generator(this, function (_a) {
            start = Date.now();
            res.on('close', function requestLogger() {
                var data = {
                    status: res.statusCode,
                    time: (Date.now() - start) / 1000,
                    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                    auth: req.auth,
                };
                if (req.headers['referer']) {
                    data.referer = req.headers['referer'];
                }
                logger_1.default.log("[" + req.method + "] " + req.originalUrl, __assign({ type: 'http', method: req.method, url: req.originalUrl }, data));
            });
            return [2 /*return*/];
        });
    }); });
}
exports.withLogs = withLogs;
function withDDosProtection(options) {
    if (options === void 0) { options = {}; }
    var config = __assign(__assign({ checkinterval: 5, limit: 500 }, options), { errormessage: JSON.stringify(error_1.default.toJSON(new error_1.default('Too many requests', error_1.default.TooManyRequests))) });
    var protection = new ddos_1.default(config);
    return protection.express;
}
exports.withDDosProtection = withDDosProtection;
function withSecurityHeaders() {
    return handle_1.middleware(function (req, res) {
        res.set('Strict-Transport-Security', 'max-age=63072000; includeSubdomains; preload');
        res.set('X-Content-Type-Options', 'nosniff');
        res.set('X-Frame-Options', 'DENY');
        res.set('X-XSS-Protection', '1; mode=block');
        res.set('Referrer-Policy', 'no-referrer, strict-origin-when-cross-origin');
        var host = req.hostname;
        var tld = host.split('.').slice(-2).join('.');
        var scriptPolicies = Array.from(new Set([
            "'self'",
            "'unsafe-inline'",
            "'unsafe-eval'",
            "https://" + tld,
            "https://*." + tld,
            'https://decentraland.org',
            'https://*.decentraland.org',
            'https://www.google-analytics.com',
            'https://ajax.cloudflare.com',
        ])).join(' ');
        res.set('Content-Security-Policy', [
            "default-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "manifest-src 'self'",
            "media-src 'self'",
            "worker-src 'self'",
            "script-src " + scriptPolicies,
            "font-src https: data:",
            "prefetch-src https: data:",
            "style-src 'unsafe-inline' https: data:",
            "img-src https: data:",
            "connect-src https:",
            "frame-src https:",
            "child-src https:",
            "object-src 'none'",
            "frame-ancestors 'none'",
        ].join('; '));
    });
}
exports.withSecurityHeaders = withSecurityHeaders;
