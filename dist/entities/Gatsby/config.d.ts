import type { Proxy } from './types';
export declare function proxy(url: string, prefix: string): Proxy;
export declare function proxy(url: string, prefixes: string[]): Proxy[];
export declare const useProxy: typeof proxy;
export declare function useIntlPaths(paths: string[], langs: string[]): string[];
