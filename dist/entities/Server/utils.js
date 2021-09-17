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
exports.serverInitializer = exports.listen = exports.DEFAULT_HOST = exports.DEFAULT_PORT = void 0;
var cluster_1 = __importDefault(require("cluster"));
var os_1 = require("os");
var safe_1 = require("colors/safe");
exports.DEFAULT_PORT = 4000;
exports.DEFAULT_HOST = '0.0.0.0';
function log(protocol, host, port) {
    var workerDetails = cluster_1.default.isMaster
        ? { cluster: 'master', pid: process.pid }
        : { cluster: cluster_1.default.worker.id, pid: process.pid };
    if (host === '127.0.0.1') {
        console.log("running server on:", safe_1.yellow(protocol + "localhost:" + port), safe_1.green(JSON.stringify(workerDetails)));
    }
    console.log("running server on:", safe_1.yellow("" + protocol + host + ":" + port), safe_1.green(JSON.stringify(workerDetails)));
}
function listen(app, port, host) {
    if (port === void 0) { port = process.env.PORT || exports.DEFAULT_PORT; }
    if (host === void 0) { host = process.env.HOST || exports.DEFAULT_HOST; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            port = Number(port);
            if (!Number.isFinite(port)) {
                port = 4000;
            }
            return [2 /*return*/, new Promise(function (resolve) {
                    var server = app.listen(port, host, function () {
                        var e_1, _a, e_2, _b;
                        var protocol = 'http://';
                        var canonicalHost = host === exports.DEFAULT_HOST ? '127.0.0.1' : host;
                        if (host !== exports.DEFAULT_HOST) {
                            log(protocol, canonicalHost, port);
                        }
                        else {
                            var interfaces = os_1.networkInterfaces();
                            try {
                                for (var _c = __values(Object.values(interfaces)), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    var details = _d.value;
                                    if (details) {
                                        try {
                                            for (var details_1 = (e_2 = void 0, __values(details)), details_1_1 = details_1.next(); !details_1_1.done; details_1_1 = details_1.next()) {
                                                var detail = details_1_1.value;
                                                if (detail.family === 'IPv4') {
                                                    log(protocol, detail.address, port);
                                                }
                                            }
                                        }
                                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                                        finally {
                                            try {
                                                if (details_1_1 && !details_1_1.done && (_b = details_1.return)) _b.call(details_1);
                                            }
                                            finally { if (e_2) throw e_2.error; }
                                        }
                                    }
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                        }
                        return resolve(server);
                    });
                })];
        });
    });
}
exports.listen = listen;
exports.serverInitializer = function (app, port, host) {
    if (port === void 0) { port = exports.DEFAULT_PORT; }
    if (host === void 0) { host = exports.DEFAULT_HOST; }
    return function () { return __awaiter(void 0, void 0, void 0, function () {
        var server_1, workers_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (process.env.HTTP === 'false') {
                        return [2 /*return*/, function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/];
                            }); }); }];
                    }
                    if (!(process.env.HTTP_CLUSTER !== 'true')) return [3 /*break*/, 2];
                    return [4 /*yield*/, listen(app, port, host)];
                case 1:
                    server_1 = _a.sent();
                    return [2 /*return*/, function () {
                            return new Promise(function (resolve, reject) {
                                console.log("stopping server...");
                                server_1.close(function (err) {
                                    err ? reject(err) : resolve();
                                });
                            });
                        }];
                case 2:
                    workers_1 = os_1.cpus().map(function () {
                        console.log("forking http server...");
                        return cluster_1.default.fork(__assign(__assign({}, process.env), { HTTP_CLUSTER: 'false', JOBS: 'false' }));
                    });
                    return [2 /*return*/, function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, Promise.all(workers_1.map(function (worker) { return __awaiter(void 0, void 0, void 0, function () {
                                        var waitForClose;
                                        return __generator(this, function (_a) {
                                            waitForClose = new Promise(function (resolve) {
                                                worker.on('exit', function () { return resolve(null); });
                                            });
                                            worker.kill();
                                            return [2 /*return*/, waitForClose];
                                        });
                                    }); }))];
                            });
                        }); }];
            }
        });
    }); };
};
