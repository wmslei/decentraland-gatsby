import EntityStore, { EntityStoreState } from '../utils/EntityStore';
export declare type Selector<E extends object, R> = (store: EntityStoreState<E>) => R;
export default function useEntityStoreSelector<E extends object, R>(store: EntityStore<E>, selector?: (store: EntityStoreState<E>) => R): R;
