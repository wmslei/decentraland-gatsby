export declare type Token = string | undefined | null | false;
/**
 * Represents a set of space-separated tokens. It is indexed
 * beginning with 0 as with JavaScript Array objects. TokenList
 * is always case-sensitive.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList
 */
export default class TokenList {
    static join(tokens: Token[]): string;
    private tokens;
    constructor(initialValue?: Token);
    get length(): number;
    get value(): string;
    item(index: number): string;
    contains(token: Token): boolean;
    add(...tokens: Token[]): this;
    remove(...tokens: Token[]): this;
    replace(oldToken: Token, newToken: Token): this;
    toggle(token: Token, force?: boolean): this;
    entries(): IterableIterator<[number, string]>;
    forEach(callback: (value: string, index: number, arr: string[]) => void, thisArg?: any): void;
    keys(): IterableIterator<number>;
    values(): IterableIterator<string>;
    [Symbol.iterator](): IterableIterator<string>;
}
