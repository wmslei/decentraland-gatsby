import { Request } from 'express';
export declare type ParamOptions = {
    validator: (value: any) => boolean;
    parser: <T>(value: any) => T;
};
/**
 * @deprecated use the handle context instead
 */
export default function param<T = string>(req: Request, name: string, validator?: (value: any) => boolean): T;
export declare function num(value: any): number | null;
export declare function bool(value: any): boolean | null;
export declare function number(value: any): number | null;
export declare function integer(value: any): number | null;
