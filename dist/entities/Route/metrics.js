"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.http_request_duration_seconds = exports.http_request_pool_size = void 0;
var prom_client_1 = __importDefault(require("prom-client"));
var metrics_1 = require("../Prometheus/metrics");
exports.http_request_pool_size = new prom_client_1.default.Gauge({
    name: 'http_request_pool_size',
    help: 'The number of requests that are running at the same time',
    registers: [],
    labelNames: ['method', 'handler'],
});
exports.http_request_duration_seconds = new prom_client_1.default.Histogram({
    name: 'http_request_duration_seconds',
    help: 'The time (in seconds) it takes for a request to be handled',
    registers: [],
    labelNames: ['method', 'handler', 'statusCode'],
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
metrics_1.registerMetric(exports.http_request_pool_size);
metrics_1.registerMetric(exports.http_request_duration_seconds);
