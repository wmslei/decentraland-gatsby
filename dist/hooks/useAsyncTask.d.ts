export default function useAsyncTask<A extends any[] = []>(callback: (...args: A) => Promise<any>): readonly [boolean, (...args: A) => void];
