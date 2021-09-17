import { db } from 'decentraland-server';
declare const pg: db.Postgres;
declare const database: typeof pg;
export default database;
