/**
 * @deprecated
 */
export declare type EntityStoreState<E extends object> = {
    error: string | null;
    loading: boolean;
    data: Record<string, E>;
    lists: Record<string, string[] | null>;
};
export declare type EntityStoreOptions<E extends object> = {
    identifier: (state: E) => string;
    initialState: Partial<EntityStoreState<E>>;
};
export interface EntityStoreConstructor<E extends object> {
    new (): EntityStore<E>;
}
export default class EntityStore<E extends object> {
    private config;
    private listener;
    private state;
    constructor(config?: Partial<EntityStoreOptions<E>>);
    addEventListener(event: string, callback: (entity: EntityStoreState<E>) => void): void;
    removeEventListener(event: string, callback: (entity: EntityStoreState<E>) => void): void;
    getState(): EntityStoreState<E>;
    getEntity(id: string): E | null;
    getList(listName?: string): E[] | null;
    setEntity(entity: E): void;
    setEntities(entities: E[], listName?: string): void;
    setError(error: Error): void;
    setLoading(value?: boolean): boolean;
    isLoading(): boolean;
    clearList(listName?: string): void;
    clear(): void;
}
