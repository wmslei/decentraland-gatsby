import client from 'prom-client';
export declare const http_request_pool_size: client.Gauge<"method" | "handler">;
export declare const http_request_duration_seconds: client.Histogram<"method" | "handler" | "statusCode">;
