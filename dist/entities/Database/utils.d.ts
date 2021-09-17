import { Model, raw, SQLStatement, SQL } from 'decentraland-server';
import { ServiceStartHandler } from '../Server/types';
import { LimitOptions } from './types';
export interface ModelConstructor {
    tableName: string;
    new (): Model<any>;
}
export { raw, SQL, SQLStatement };
export declare const databaseInitializer: () => ServiceStartHandler;
export declare function table(model: ModelConstructor): SQLStatement;
export declare function conditional(condition: boolean, statement: SQLStatement): SQLStatement;
export declare function columns(names: string[]): SQLStatement;
export declare function values(list: any[]): SQLStatement;
export declare function objectValues(names: string[], list: Record<string, any>[]): SQLStatement;
export declare function join(statements: SQLStatement[], glue?: SQLStatement): SQLStatement;
export declare function offset(value: number | null | undefined): SQLStatement;
export declare function limit(value: number | null | undefined, options?: Partial<LimitOptions>): SQLStatement;
