import { DependencyList } from 'react';
export default function useInterval<T>(fun: () => T, interval: number, deps?: DependencyList): T;
