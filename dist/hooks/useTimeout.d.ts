export default function useTimeout<T>(fun: () => T, at: Pick<Date, 'getTime'>): T | null;
