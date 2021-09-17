export default class RequestError extends Error {
    url: string;
    options: RequestInit;
    code: 'REQUEST_ERROR' | 'SERVER_ERROR';
    headers: Record<string, string | null>;
    statusCode: number;
    body: any;
    constructor(url: string, options: RequestInit, res: Response, body: any);
}
