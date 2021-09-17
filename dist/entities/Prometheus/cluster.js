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
exports.ClusterRegistry = void 0;
var cluster_1 = __importDefault(require("cluster"));
var prom_client_1 = require("prom-client");
var logger_1 = __importDefault(require("../Development/logger"));
var types_1 = require("./types");
var REQUEST_ID = 0;
var ClusterRegistry = /** @class */ (function () {
    function ClusterRegistry() {
        var _this = this;
        this.registry = new prom_client_1.Registry();
        this.forkRequests = new Map();
        this.masterRequests = new Map();
        this.handleMasterMessages = function (message) {
            switch (message.type) {
                case types_1.ClusterMessageType.RequestMetric:
                    return _this.forwardRequestMetrics(message);
                case types_1.ClusterMessageType.ResponsetMetric:
                    return _this.collectMetrics(message);
            }
        };
        this.handleForkMessages = function (message) {
            switch (message.type) {
                case types_1.ClusterMessageType.RequestMetric:
                    return _this.reportForkMetrics(message);
                case types_1.ClusterMessageType.ResponsetMetric:
                    return _this.resolveForkMetrics(message);
            }
        };
        ClusterRegistry.addEventListener(this);
    }
    ClusterRegistry.sendMessage = function (report) {
        if (process.send) {
            process.send(report);
        }
    };
    ClusterRegistry.createId = function () {
        return [ClusterRegistry.getCurrentWorkerId(), REQUEST_ID++].join('::');
    };
    ClusterRegistry.getCurrentWorkerId = function () {
        return cluster_1.default.worker.id;
    };
    ClusterRegistry.getWorker = function (id) {
        return (cluster_1.default.workers &&
            cluster_1.default.workers[id]);
    };
    ClusterRegistry.getWorkers = function () {
        return Object.values(cluster_1.default.workers).filter(Boolean);
    };
    ClusterRegistry.addEventListener = function (registry) {
        process.on('message', registry.handler);
    };
    ClusterRegistry.removeEventListener = function (registry) {
        process.off('message', registry.handler);
    };
    ClusterRegistry.isMaster = function () {
        return cluster_1.default.isMaster;
    };
    ClusterRegistry.merge = function (registers) {
        var e_1, _a, e_2, _b;
        var clusterRegistry = new ClusterRegistry();
        try {
            for (var registers_1 = __values(registers), registers_1_1 = registers_1.next(); !registers_1_1.done; registers_1_1 = registers_1.next()) {
                var registry = registers_1_1.value;
                var metrics = registry.getMetricsAsArray();
                try {
                    for (var metrics_1 = (e_2 = void 0, __values(metrics)), metrics_1_1 = metrics_1.next(); !metrics_1_1.done; metrics_1_1 = metrics_1.next()) {
                        var metric = metrics_1_1.value;
                        clusterRegistry.registerMetric(metric);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (metrics_1_1 && !metrics_1_1.done && (_b = metrics_1.return)) _b.call(metrics_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (registers_1_1 && !registers_1_1.done && (_a = registers_1.return)) _a.call(registers_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return clusterRegistry;
    };
    ClusterRegistry.prototype.registerMetric = function (metrics) {
        this.registry.registerMetric(metrics);
    };
    Object.defineProperty(ClusterRegistry.prototype, "handler", {
        get: function () {
            return ClusterRegistry.isMaster()
                ? this.handleMasterMessages
                : this.handleForkMessages;
        },
        enumerable: false,
        configurable: true
    });
    ClusterRegistry.prototype.metrics = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id, req;
            var _this = this;
            return __generator(this, function (_a) {
                if (ClusterRegistry.isMaster()) {
                    return [2 /*return*/, this.registry.metrics()];
                }
                id = ClusterRegistry.createId();
                req = new Promise(function (resolve) {
                    _this.forkRequests.set(id, resolve);
                });
                ClusterRegistry.sendMessage({
                    id: id,
                    type: types_1.ClusterMessageType.RequestMetric,
                    worker: ClusterRegistry.getCurrentWorkerId(),
                });
                return [2 /*return*/, req];
            });
        });
    };
    ClusterRegistry.prototype.reportForkMetrics = function (message) {
        var metrics = this.registry.getMetricsAsJSON().catch(function (err) {
            logger_1.default.error("Error getting metrics as JSON: " + err.message, err);
            return [];
        });
        return metrics.then(function (metrics) {
            var report = {
                type: types_1.ClusterMessageType.ResponsetMetric,
                id: message.id,
                metrics: metrics,
            };
            ClusterRegistry.sendMessage(report);
        });
    };
    ClusterRegistry.prototype.resolveForkMetrics = function (message) {
        var resolve = this.forkRequests.get(message.id);
        if (resolve) {
            this.forkRequests.delete(message.id);
            var registry = prom_client_1.AggregatorRegistry.aggregate([message.metrics]);
            registry
                .metrics()
                .then(function (metrics) { return resolve(metrics); })
                .catch(function (err) {
                logger_1.default.error("Error resolving metrics: " + err.message, err);
                resolve('');
            });
        }
    };
    ClusterRegistry.prototype.forwardRequestMetrics = function (message) {
        var e_3, _a;
        if (!ClusterRegistry.isMaster()) {
            return;
        }
        var workers = ClusterRegistry.getWorkers();
        var pending = workers.length;
        if (pending === 0) {
            return;
        }
        var worker = message.worker;
        var metrics = [];
        this.masterRequests.set(message.id, { pending: pending, worker: worker, metrics: metrics });
        try {
            for (var workers_1 = __values(workers), workers_1_1 = workers_1.next(); !workers_1_1.done; workers_1_1 = workers_1.next()) {
                var fork = workers_1_1.value;
                fork.send(message);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (workers_1_1 && !workers_1_1.done && (_a = workers_1.return)) _a.call(workers_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    ClusterRegistry.prototype.collectMetrics = function (message) {
        var task = this.masterRequests.get(message.id);
        if (task) {
            task.pending--;
            task.metrics.push(message.metrics);
            if (task.pending === 0) {
                this.masterRequests.delete(message.id);
                var fork = ClusterRegistry.getWorker(task.worker);
                if (fork) {
                    fork.send({
                        id: message.id,
                        type: types_1.ClusterMessageType.ResponsetMetric,
                        metrics: task.metrics,
                    });
                }
            }
        }
    };
    return ClusterRegistry;
}());
exports.ClusterRegistry = ClusterRegistry;
