export default class EmptyAccountsError extends Error {
    code: string;
    constructor(message?: string);
}
