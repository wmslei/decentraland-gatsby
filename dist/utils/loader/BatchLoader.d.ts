import Dataloader from 'dataloader';
export default class BatchLoader<V, K = string | number> {
    private loader;
    cache: Map<K, Promise<V>>;
    data: Map<K, V>;
    readonly handle: (key: K[]) => Promise<V[]>;
    constructor(handle: (key: K[]) => Promise<V[]>, options?: Dataloader.Options<K, V>);
    private _handle;
    load(key: K): Promise<V>;
    isLoading(key: K): boolean;
    get size(): number;
    set(key: K, value: V): void;
    clear(key: K): boolean;
    clearAll(): boolean;
}
