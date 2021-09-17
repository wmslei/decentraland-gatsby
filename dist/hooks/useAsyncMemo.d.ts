import { DependencyList } from 'react';
declare type AsyncMemoOptions<T = any, I = null> = {
    initialValue: T | I;
    callWithTruthyDeps: boolean;
};
export declare type AsyncMemoResultState<T, I = null> = {
    version: number;
    time: number;
    error: Error | null;
    loading: boolean;
    reload: () => void;
    set: (value: ((current: T | I) => T) | T) => void;
};
export declare type AsyncMemoResult<T, I = null> = readonly [T | I, AsyncMemoResultState<T, I>];
export declare function createAsyncMemoState<T, I = null>(value: T | I): AsyncMemoResultState<T, I>;
/**
 * Execute and async function and save the result in the component memory,
 * it will execute again each time deps change, and it return only the result
 * for the latest change
 *
 * @param callback - async function
 * @param deps - dependency list
 * @param options.initialValue - initial memo value (default=null)
 * @param options.callWithTruthyDeps - if true the effect will be executed only when
 *   all values in the dependency list are evaluated as true
 */
export default function useAsyncMemo<T, I = null>(callback: () => Promise<T>, deps?: DependencyList, options?: Partial<AsyncMemoOptions<T, I>>): AsyncMemoResult<T, I>;
export {};
