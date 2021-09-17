import { Router, RouterOptions } from 'express';
export declare type RouterHandler = (router: Router) => void;
export declare type RoutesOptions = RouterOptions;
export declare type DDosOptions = {
    limit: number;
    maxcount: number;
    burst: number;
    maxexpiry: number;
    checkinterval: number;
    responseStatus: number;
};
export declare type CorsOptions = {
    cors?: 'public' | '*' | 'default' | 'same-origin' | false;
    corsOrigin?: boolean | string | RegExp | (string | RegExp)[];
    allowedHeaders?: string | string[];
    exposedHeaders?: string | string[];
};
export declare type BodyParserOptions = {
    json?: boolean;
    urlencode?: boolean;
};
export declare function createCorsOptions(options?: CorsOptions): {
    origin: string | true | RegExp | (string | RegExp)[];
    allowedHeaders: import("framer-motion").VariantLabels;
    exposedHeaders: import("framer-motion").VariantLabels;
} | {
    origin: boolean;
    allowedHeaders: import("framer-motion").VariantLabels;
    exposedHeaders: import("framer-motion").VariantLabels;
};
export declare const defaultOrigin: RegExp[];
export declare const defaultAllowedHeaders: string[];
export declare const defaultExposedHeaders: string[];
