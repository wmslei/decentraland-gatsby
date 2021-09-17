"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMetric = exports.registry = void 0;
var prom_client_1 = __importDefault(require("prom-client"));
var defaultLabels = {};
if (process.env.SERVICE_NAME) {
    defaultLabels.serviceName = process.env.SERVICE_NAME;
}
if (process.env.SERVICE_VERSION) {
    defaultLabels.serviceVersion = process.env.SERVICE_VERSION;
}
if (process.env.SERVICE_URL) {
    defaultLabels.serviceUrl = process.env.SERVICE_URL;
}
exports.default = prom_client_1.default;
exports.registry = new prom_client_1.default.Registry();
exports.registry.setDefaultLabels(defaultLabels);
prom_client_1.default.collectDefaultMetrics({ register: exports.registry });
var alreadyRegisted = new Set();
function registerMetric(metric) {
    if (!alreadyRegisted.has(metric)) {
        exports.registry.registerMetric(metric);
        alreadyRegisted.add(metric);
    }
}
exports.registerMetric = registerMetric;
