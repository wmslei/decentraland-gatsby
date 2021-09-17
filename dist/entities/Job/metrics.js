"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.job_manager_duration_seconds = exports.job_manager_pool_size = void 0;
var metrics_1 = __importStar(require("../Prometheus/metrics"));
exports.job_manager_pool_size = new metrics_1.default.Gauge({
    name: 'job_manager_pool_size',
    help: 'The number of jobs that are running at the same time',
    registers: [],
    labelNames: ['job'],
});
exports.job_manager_duration_seconds = new metrics_1.default.Histogram({
    name: 'job_manager_duration_seconds',
    help: 'The time (in seconds) it takes for a job to complete',
    registers: [],
    labelNames: ['job', 'error'],
    buckets: [
        0.005,
        0.01,
        0.025,
        0.05,
        0.1,
        0.25,
        0.5,
        1,
        2.5,
        5,
        10,
        20,
        30,
        60,
    ],
});
metrics_1.registerMetric(exports.job_manager_pool_size);
metrics_1.registerMetric(exports.job_manager_duration_seconds);
