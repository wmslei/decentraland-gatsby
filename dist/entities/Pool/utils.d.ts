import { Options, Pool } from 'generic-pool';
export { Pool };
export declare function createItemPool<T>(items: T[]): Pool<T>;
export declare function createVoidPool(options?: Options): Pool<any>;
