import { DependencyList } from 'react';
export default function useGlobalMemo<T>(callback: () => T, deps: DependencyList): T;
