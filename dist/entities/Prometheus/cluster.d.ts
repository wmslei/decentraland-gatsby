/// <reference types="node" />
import cluster from 'cluster';
import client, { Registry } from 'prom-client';
import { MetricMessage, ReportMetricsRequest, ReportMetricsResponse } from './types';
export declare class ClusterRegistry {
    static sendMessage(report: MetricMessage): void;
    static createId(): string;
    static getCurrentWorkerId(): number;
    static getWorker(id: number): Pick<cluster.Worker, "id" | "send"> | undefined;
    static getWorkers(): Pick<cluster.Worker, "id" | "send">[];
    static addEventListener(registry: ClusterRegistry): void;
    static removeEventListener(registry: ClusterRegistry): void;
    static isMaster(): boolean;
    static merge(registers: Registry[]): ClusterRegistry;
    private registry;
    private forkRequests;
    private masterRequests;
    constructor();
    registerMetric(metrics: client.Metric<any>): void;
    handleMasterMessages: (message: MetricMessage) => void;
    handleForkMessages: (message: MetricMessage) => void | Promise<void>;
    get handler(): (message: MetricMessage) => void;
    metrics(): Promise<string>;
    reportForkMetrics(message: ReportMetricsRequest): Promise<void>;
    resolveForkMetrics(message: ReportMetricsResponse): void;
    forwardRequestMetrics(message: ReportMetricsRequest): void;
    collectMetrics(message: ReportMetricsResponse): void;
}
