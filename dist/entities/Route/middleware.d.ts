/// <reference types="connect" />
import expressCors from 'cors';
import { DDosOptions, CorsOptions, BodyParserOptions } from './types';
export declare function withBody(options?: BodyParserOptions): import("express-serve-static-core").Router;
export declare function withCors(options?: CorsOptions): (req: expressCors.CorsRequest, res: {
    statusCode?: number | undefined;
    setHeader(key: string, value: string): any;
    end(): any;
}, next: (err?: any) => any) => void;
export declare function withLogs(): import("connect").NextHandleFunction;
export declare function withDDosProtection(options?: Partial<DDosOptions>): any;
export declare function withSecurityHeaders(): import("connect").NextHandleFunction;
