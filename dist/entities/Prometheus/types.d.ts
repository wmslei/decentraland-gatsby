import client from './metrics';
export declare enum ClusterMessageType {
    RequestMetric = "request_metrics",
    ResponsetMetric = "response_metrics"
}
export declare type MetricMessage = ReportMetricsRequest | ReportMetricsResponse;
export declare type ReportMetricsRequest = {
    type: ClusterMessageType.RequestMetric;
    worker: number;
    id: string;
};
export declare type ReportMetricsResponse = {
    type: ClusterMessageType.ResponsetMetric;
    id: string;
    metrics: client.metric[];
};
