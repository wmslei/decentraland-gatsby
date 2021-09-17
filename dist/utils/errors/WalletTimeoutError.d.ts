export default class WalletTimeoutError extends Error {
    code: string;
    constructor(message?: string);
}
