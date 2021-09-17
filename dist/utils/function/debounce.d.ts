export declare type Callback = (...args: any) => void;
export default function debounce<C extends Callback>(callback: C, timeout?: number): C;
