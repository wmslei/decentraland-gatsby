import Options, { RequestOptions } from './Options';
import 'isomorphic-fetch';
export default class API {
    static catch<T>(prom: Promise<T>): Promise<T | null>;
    static url(base: string, path?: string, query?: Record<string, string> | URLSearchParams): string;
    readonly baseUrl: string;
    readonly defaultOptions: Options;
    constructor(baseUrl?: string, defaultOptions?: Options);
    url(path: string, query?: Record<string, string> | URLSearchParams): string;
    options(options?: RequestOptions): Options;
    query<T extends {} = {}>(qs?: T): string;
    fetch<T extends object>(path: string, options?: Options): Promise<T>;
}
