/// <reference types="qs" />
/// <reference types="express" />
import { AsyncHandler } from '../handle';
export default function single(handler: AsyncHandler): (req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: import("express").Response<any, Record<string, any>>) => void;
