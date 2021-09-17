import { Request, Response } from 'express';
export declare type ParamOptions<T> = {
    validator?: (value: any) => boolean;
    parser?: (value: any) => T | null;
    required?: boolean;
    defaultValue?: T;
};
export default class Context {
    readonly req: Request;
    readonly res: Response;
    constructor(req: Request, res: Response);
    header(name: string, defaultValue?: string | undefined): string | undefined;
    value<T = string>(name: string, value: any, options?: ParamOptions<T>): T | null;
    param<T = string>(name: string, options?: ParamOptions<T>): T | null;
    pathParam<T = string>(name: string, options?: ParamOptions<T>): T | null;
    searchParam<T = string>(name: string, options?: ParamOptions<T>): T | null;
    bodyParam<T = string>(name: string, options?: ParamOptions<T>): T | null;
}
