export default class FetchError extends Error {
    url: string;
    options: RequestInit;
    code: string;
    constructor(url: string, options: RequestInit, message: string);
}
