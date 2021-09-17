import client from '../Prometheus/metrics';
export declare type JobLabels = Record<'job', string | number>;
export declare const database_pool_size: client.Gauge<"method" | "rows" | "table" | "conditions" | "orderBy" | "updates" | "hash">;
export declare const database_duration_seconds: client.Histogram<"method" | "rows" | "table" | "error" | "conditions" | "orderBy" | "updates" | "hash">;
export declare type DatabaseMetricParams = Record<'table' | 'method' | 'conditions' | 'orderBy' | 'rows' | 'updates' | 'hash', string | number>;
export declare function withDatabaseMetrics<T>(exec: () => Promise<T>, params: Partial<DatabaseMetricParams>): Promise<T>;
