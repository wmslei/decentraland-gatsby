import client from 'prom-client';
export default client;
export declare const registry: client.Registry;
export declare function registerMetric(metric: client.Metric<string>): void;
