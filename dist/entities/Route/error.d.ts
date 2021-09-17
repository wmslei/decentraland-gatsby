export default class RequestError extends Error {
    statusCode: number;
    data?: any;
    static BadRequest: number;
    static Unauthorized: number;
    static Forbidden: number;
    static NotFound: number;
    static PayloadTooLarge: number;
    static IAmATeapot: number;
    static TooManyRequests: number;
    static InternalServerError: number;
    static NotImplemented: number;
    static ServiceUnavailable: number;
    static toJSON(err: Error & {
        data?: any;
    }): Record<string, any>;
    constructor(message: string, statusCode?: number, data?: any);
}
