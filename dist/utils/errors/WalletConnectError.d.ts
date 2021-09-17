export default class WalletConnectError extends Error {
    code: string;
    constructor(message?: string);
}
