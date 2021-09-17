/// <reference types="connect" />
import { Request } from 'express';
import { Avatar } from '../../utils/api/Catalyst';
export declare type WithProfile<R extends Request = Request> = R & {
    profile?: Avatar;
};
export declare type WithAuthProfile<R extends Request = Request> = R & {
    authProfile?: Avatar;
};
export declare type WithProfileOptions = {
    optional?: boolean;
};
export declare function getUserParam(req: Request): string;
export declare function withProfile(options?: WithProfileOptions): import("connect").NextHandleFunction;
export declare function withAuthProfile(options?: WithProfileOptions): import("connect").NextHandleFunction;
