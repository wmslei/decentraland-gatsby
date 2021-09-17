import { Response, Request } from 'express';
export default function redirect(to: string, status?: number): (_: Request, res: Response) => void;
