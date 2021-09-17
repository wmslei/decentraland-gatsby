import React from 'react';
import EntityStore, { EntityStoreState } from '../utils/EntityStore';
export default function useStore<E extends object>(initialState?: Partial<EntityStoreState<E>>, deps?: React.DependencyList): EntityStore<E>;
