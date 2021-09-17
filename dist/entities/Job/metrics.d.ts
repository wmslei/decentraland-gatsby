import client from '../Prometheus/metrics';
export declare type JobLabels = Record<'job', string | number>;
export declare const job_manager_pool_size: client.Gauge<"job">;
export declare const job_manager_duration_seconds: client.Histogram<"error" | "job">;
