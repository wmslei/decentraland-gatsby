export default function delay(time: number): Promise<void>;
export default function delay<T>(time: number, value?: Promise<T>): Promise<T>;
export default function delay<T>(time: number, value?: T): Promise<T>;
