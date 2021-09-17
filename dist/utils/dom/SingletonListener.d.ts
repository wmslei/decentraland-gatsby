export declare type TargetListener = Pick<HTMLElement, 'addEventListener' | 'removeEventListener'>;
export declare type EventMap = HTMLElementEventMap & WindowEventMap;
export declare type Event = keyof EventMap;
export declare type Listener<K extends Event = any> = (this: HTMLElement, ev: EventMap[K]) => any;
export declare type Callback<D extends {}> = (this: HTMLElement, data: D) => any;
/**
 * SingletonListener
 *
 * An event handler manager to minimize the number of subscription to DOM objects
 */
export default class SingletonListener<T extends TargetListener> {
    /**
     * instance store
     */
    static cache: Map<number, SingletonListener<any>>;
    /**
     * Check for previous instance to return, otherwise create new one
     *
     * @param target listener target
     */
    static from<T extends TargetListener>(target: T): SingletonListener<T>;
    readonly target: T | null;
    private listeners;
    private callbacks;
    /**
     * return the total of subscription to this listener
     */
    get size(): number;
    constructor(target?: T | null);
    /**
     * Create a physical subscription to a target event
     * @param event
     */
    private subscribe;
    /**
     * Remove a virtual subscription to a target event
     * if there aren't any more virtual subscription then
     * will remove the physical subscription
     *
     * @param event
     */
    private unsubscribe;
    /**
     * Dispatch and event to all virtual subscriptions
     * @param event
     * @param data
     */
    dispatch<K extends Event>(event: K, data: EventMap[K]): Promise<void>;
    /**
     * Create a virtual subscription to the target
     *
     * @param event
     * @param listener
     */
    addEventListener<K extends Event>(event: K, listener: Listener<K>): this;
    /**
     * Remove a virtual subscription to the target
     * @param event
     * @param listener
     */
    removeEventListener<K extends Event>(event: K, listener: Listener<K>): this;
}
