import { JobAttributes } from '../types';
export default class MemoryModel {
    static cache: Map<string, JobAttributes>;
    static getPending(): Promise<JobAttributes<{}>[]>;
    static schedule(id: string, name: string, date: Date, payload?: object): Promise<JobAttributes<{}>>;
    static updatePayload(id: string, payload?: object): Promise<void>;
    static complete(id: string): Promise<boolean>;
}
