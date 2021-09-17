import JobContext from './context';
export declare type Job<P extends object = {}> = ((ctx: JobContext<P>) => Promise<any>) & {
    jobName?: string;
};
export declare function createJob<P extends object = {}>(jobName: string, job: (ctx: JobContext<P>) => Promise<any>): Job;
