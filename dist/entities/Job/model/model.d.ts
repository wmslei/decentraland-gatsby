import { Model } from 'decentraland-server';
import { JobAttributes } from '../types';
export default class Job extends Model<JobAttributes> {
    static tableName: string;
    static build(job: JobAttributes): JobAttributes;
    static getPending(): Promise<JobAttributes<{}>[]>;
    static updatePayload(id: string, payload?: object): Promise<any[] | undefined>;
    static schedule(id: string, name: string, date: Date, payload?: object): Promise<JobAttributes<{}>>;
    static complete(id: string): Promise<boolean>;
}
