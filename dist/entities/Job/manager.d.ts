/// <reference types="node" />
import { CronJob } from 'cron';
import { JobSettings, CronTime } from './types';
import { Pool } from '../Pool/utils';
import MemoryModel from './model/memory';
import DatabaseModel from './model/model';
import type { Job } from './job';
export default class JobManager {
    memory: boolean;
    runningJobs: Set<string>;
    jobs: Map<string, Job<any>>;
    crons: CronJob[];
    pool: Pool<any>;
    interval: NodeJS.Timeout;
    initialInterval: NodeJS.Timeout;
    running: boolean;
    constructor(settings: JobSettings);
    time(cronTime: CronTime): string | Date;
    getModel(): typeof MemoryModel | typeof DatabaseModel;
    stats(): {
        size: number;
        available: number;
        running: number;
        pending: number;
        ids: string[];
    };
    define(handler: string, job: Job<any>): this;
    cron(cron: CronTime, job: Job<any>): this;
    use(job: Job<any>, options?: Partial<{
        handler: string;
        cron: CronTime;
    }>): this;
    start(): void;
    stop(): void;
    check(): Promise<void>;
    updatePayload: (id: string, payload?: object) => Promise<void>;
    schedule: (handler: string, date: Date, payload?: object) => Promise<void>;
    run(id: string, handler: string, payload: any): Promise<void>;
    runJobs(id: string, handler: string, payload: any, job: Job<any>): Promise<void>;
}
