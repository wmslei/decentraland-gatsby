export default function retry<T>(times: number, fun: () => Promise<T>): Promise<T>;
