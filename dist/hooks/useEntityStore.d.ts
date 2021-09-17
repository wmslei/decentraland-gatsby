import EntityStore, { EntityStoreState } from '../utils/EntityStore';
export default function useEntityStore<E extends object>(store: EntityStore<E>): EntityStoreState<E>;
