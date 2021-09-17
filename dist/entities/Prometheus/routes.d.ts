/// <reference types="express" />
import client from 'prom-client';
declare const _default: import("express").Router;
export default _default;
export declare function exposeRegistry(registry: client.Registry): number;
export declare function getMetrics(): Promise<string>;
