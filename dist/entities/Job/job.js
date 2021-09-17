"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJob = void 0;
function createJob(jobName, job) {
    return Object.assign(job, { jobName: jobName });
}
exports.createJob = createJob;
