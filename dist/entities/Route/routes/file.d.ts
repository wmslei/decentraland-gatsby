/// <reference types="qs" />
/// <reference types="node" />
import { Response } from 'express';
export default function file(path: string, status?: number): (req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => void;
export declare function readOnce(path: string): Promise<Buffer>;
