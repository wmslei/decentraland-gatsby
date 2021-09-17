import client from '../Prometheus/metrics';
export declare type SesSendLabels = Record<'region' | 'source' | 'bulk', string | number>;
export declare const aws_ses_sent_total: client.Counter<"email" | "region" | "bulk">;
