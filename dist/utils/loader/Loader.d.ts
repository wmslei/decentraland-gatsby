export default class Loader<V, K = string | number> {
    cache: Map<K, Promise<V>>;
    data: Map<K, V>;
    readonly handle: (key: K) => Promise<V>;
    constructor(handle: (key: K) => Promise<V>);
    private _handle;
    load(key: K): Promise<V>;
    isLoading(key: K): boolean;
    get size(): number;
    set(key: K, value: V): void;
    clear(key: K): boolean;
    clearAll(): boolean;
}
