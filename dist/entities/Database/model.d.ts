import { Model as BaseModel, OnConflict, PrimaryKey, QueryPart, SQLStatement } from 'decentraland-server';
export declare const QUERY_HASHES: Map<string, string>;
export declare class Model<T extends {}> extends BaseModel<T> {
    static find<U extends {} = any>(conditions?: Partial<U>, orderBy?: Partial<U>, extra?: string): Promise<U[]>;
    static findOne<U extends {} = any, P extends QueryPart = any>(primaryKey: PrimaryKey, orderBy?: Partial<P>): Promise<U | undefined>;
    static findOne<U extends QueryPart = any, P extends QueryPart = any>(conditions: Partial<U>, orderBy?: Partial<P>): Promise<U | undefined>;
    static count<U extends QueryPart = any>(conditions: Partial<U>, extra?: string): Promise<number>;
    static create<U extends QueryPart = any>(row: U): Promise<U>;
    static upsert<U extends QueryPart = any>(row: U, onConflict?: OnConflict<U>): Promise<U>;
    static update<U extends QueryPart = any, P extends QueryPart = any>(changes: Partial<U>, conditions: Partial<P>): Promise<any>;
    static delete<U extends QueryPart = any>(conditions: Partial<U>): Promise<any>;
    static query<U extends {} = any>(query: SQLStatement): Promise<U[]>;
    /**
     * Execute a query and returns the number of row affected
     */
    static rowCount(query: SQLStatement): Promise<number>;
}
