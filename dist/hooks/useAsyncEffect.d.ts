import { DependencyList } from 'react';
export default function useAsyncEffect(callback: () => Promise<void | (() => void)>, dependencies?: DependencyList): void;
