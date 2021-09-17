/// <reference types="qs" />
import { Request, Response } from 'express';
import { NextHandleFunction } from 'connect';
import Context from './context';
import RequestError from './error';
export declare type AsyncHandler = (req: Request & any, res: Response & any, ctx: Context) => Promise<any> | any;
export default handleAPI;
export declare function handleAPI(handler: AsyncHandler): (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => void;
export declare function handleJSON(handler: AsyncHandler): (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => void;
export declare function handleRaw(handler: AsyncHandler, type?: string): (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => void;
export declare function handleExpressError(err: RequestError, req: Request, res: Response): void;
export declare function middleware(handler: AsyncHandler): NextHandleFunction;
/** @deprecated */
export declare function useMiddlaware(middlaware: NextHandleFunction, req: Request, res: Response): Promise<void>;
