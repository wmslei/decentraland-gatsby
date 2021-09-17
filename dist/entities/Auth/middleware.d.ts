/// <reference types="connect" />
import { Request } from 'express';
export declare type WithAuth<R extends Request = Request> = R & {
    auth: string | null;
};
export declare type AuthOptions = {
    optional?: boolean;
    allowInvalid?: boolean;
};
export declare function auth(options?: AuthOptions): import("connect").NextHandleFunction;
export declare function withBearerToken(tokens: string[]): import("connect").NextHandleFunction;
