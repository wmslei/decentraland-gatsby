"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobInitializer = exports.createJob = void 0;
var manager_1 = __importDefault(require("./manager"));
var job_1 = require("./job");
Object.defineProperty(exports, "createJob", { enumerable: true, get: function () { return job_1.createJob; } });
var utils_1 = require("./utils");
Object.defineProperty(exports, "jobInitializer", { enumerable: true, get: function () { return utils_1.jobInitializer; } });
function job(options) {
    if (options === void 0) { options = {}; }
    return new manager_1.default(options);
}
exports.default = job;
