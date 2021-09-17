export declare type RequestOptions = Omit<RequestInit, 'headers'> & {
    headers?: Record<string, string>;
};
export default class Options {
    private options;
    constructor(options?: RequestOptions);
    merge(options: Options): Options;
    set(options?: Omit<RequestOptions, 'headers' | 'body'>): this;
    authorization(): this;
    header(key: string, value: string): this;
    headers(headers: Record<string, string>): this;
    method(method: string): this;
    json(data: any): this;
    toObject(): RequestOptions;
}
