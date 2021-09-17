export default function usePatchState<T extends object>(initialState: T): readonly [T, (newState: Partial<T>) => void];
