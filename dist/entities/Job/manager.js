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
var cron_1 = require("cron");
var uuid_1 = require("uuid");
var types_1 = require("./types");
var context_1 = __importDefault(require("./context"));
var utils_1 = require("../Pool/utils");
var memory_1 = __importDefault(require("./model/memory"));
var model_1 = __importDefault(require("./model/model"));
var metrics_1 = require("./metrics");
var logger_1 = __importDefault(require("../Development/logger"));
var JobManager = /** @class */ (function () {
    function JobManager(settings) {
        var _this = this;
        this.memory = false;
        this.runningJobs = new Set();
        this.jobs = new Map();
        this.crons = [];
        this.running = false;
        this.updatePayload = function (id, payload) {
            if (payload === void 0) { payload = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getModel().updatePayload(id, payload)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.schedule = function (handler, date, payload) {
            if (payload === void 0) { payload = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var job;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getModel().schedule(uuid_1.v4(), handler, date, payload)];
                        case 1:
                            job = _a.sent();
                            if (this.running && job.run_at.getTime() < Date.now()) {
                                this.run(job.id, job.name, job.payload);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        var max = settings.concurrency || Infinity;
        this.pool = utils_1.createVoidPool({ min: 0, max: max });
        this.memory = !!settings.memory;
        this.cron(this.time(settings.cron || '@minutely'), function () { return _this.check(); });
    }
    JobManager.prototype.time = function (cronTime) {
        if (typeof cronTime === 'string' && types_1.TimePresets[cronTime]) {
            return types_1.TimePresets[cronTime];
        }
        return cronTime;
    };
    JobManager.prototype.getModel = function () {
        if (this.memory) {
            return memory_1.default;
        }
        return model_1.default;
    };
    JobManager.prototype.stats = function () {
        return {
            size: this.pool.size,
            available: this.pool.available,
            running: this.pool.borrowed,
            pending: this.pool.pending,
            ids: Array.from(this.runningJobs.values()),
        };
    };
    JobManager.prototype.define = function (handler, job) {
        return this.use(job, { handler: handler });
    };
    JobManager.prototype.cron = function (cron, job) {
        return this.use(job, { cron: cron });
    };
    JobManager.prototype.use = function (job, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var handler = options.handler || job.jobName || job.name;
        if (this.jobs.has(handler)) {
            logger_1.default.warning("replacing job \"" + handler + "\"", { handler: handler, type: 'job' });
        }
        this.jobs.set(handler, job);
        if (options.cron) {
            this.crons.push(new cron_1.CronJob(this.time(options.cron), function () {
                _this.runJobs(uuid_1.v4(), handler, {}, job);
            }));
        }
        return this;
    };
    JobManager.prototype.start = function () {
        this.crons.forEach(function (cron) { return cron.start(); });
        this.running = true;
    };
    JobManager.prototype.stop = function () {
        this.crons.forEach(function (cron) { return cron.stop(); });
        this.running = false;
    };
    JobManager.prototype.check = function () {
        return __awaiter(this, void 0, void 0, function () {
            var jobs, pendingJobs;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getModel().getPending()];
                    case 1:
                        jobs = _a.sent();
                        pendingJobs = jobs.filter(function (job) { return !_this.runningJobs.has(job.id); });
                        if (pendingJobs.length) {
                            Promise.all(pendingJobs.map(function (job) { return _this.run(job.id, job.name, job.payload); }));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    JobManager.prototype.run = function (id, handler, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var context;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = { type: 'job', id: id, name: handler, payload: payload };
                        if (!this.jobs.has(handler)) {
                            logger_1.default.error("Missing job: " + handler + " (id: \"" + id + "\")", context);
                            return [2 /*return*/];
                        }
                        if (this.runningJobs.has(id)) {
                            logger_1.default.log("Job " + handler + " (id: \"" + id + "\") is already running", context);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.runJobs(id, handler, payload, this.jobs.get(handler))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    JobManager.prototype.runJobs = function (id, handler, payload, job) {
        return __awaiter(this, void 0, void 0, function () {
            var context, error, labels, completeJob, resource, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = new context_1.default(id, handler || job.name, payload || {}, this.schedule, this.updatePayload);
                        if (id) {
                            this.runningJobs.add(id);
                        }
                        error = 0;
                        labels = { job: handler || 'uknown' };
                        metrics_1.job_manager_pool_size.inc(labels);
                        completeJob = metrics_1.job_manager_duration_seconds.startTimer(labels);
                        return [4 /*yield*/, this.pool.acquire()];
                    case 1:
                        resource = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        return [4 /*yield*/, job(context)];
                    case 3:
                        _a.sent();
                        if (!id) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getModel().complete(id)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_1 = _a.sent();
                        logger_1.default.error("Error running job \"" + handler + "\"", __assign({ type: 'cron', id: id,
                            handler: handler,
                            payload: payload, message: err_1.message, stack: err_1.stack }, err_1));
                        error = 1;
                        return [3 /*break*/, 7];
                    case 7: return [4 /*yield*/, this.pool.release(resource)];
                    case 8:
                        _a.sent();
                        completeJob({ error: error });
                        metrics_1.job_manager_pool_size.dec(labels);
                        if (id) {
                            this.runningJobs.delete(id);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return JobManager;
}());
exports.default = JobManager;
