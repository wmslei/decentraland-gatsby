import { Request, Response } from 'express';
import { Profile } from '../../utils/loader/profile';
declare const _default: import("express").Router;
export default _default;
export declare function getProfile(req: Request<{
    user: string;
}>): Promise<Profile>;
export declare function redirectToFace(req: Request<{
    user: string;
}>, res: Response): void;
export declare function redirectToBody(req: Request<{
    user: string;
}>, res: Response): void;
export declare function redirectTo(res: Response, url?: string | null): void;
