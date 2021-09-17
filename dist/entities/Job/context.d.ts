import { ScheduleFunction, UpdatePayloadFunction } from './types';
export default class JobContext<P extends object = {}> {
    id: string | null;
    handler: string | null;
    payload: P;
    private _schedule;
    private _update;
    constructor(id: string | null, handler: string | null, payload: P, _schedule: ScheduleFunction, _update: UpdatePayloadFunction);
    log(message: string, data?: Record<string, any>): void;
    error(error: Error): void;
    error(message: string): void;
    error(message: string, data: Record<string, any>): void;
    updatePayload(payload?: object): Promise<void>;
    schedule(name: string | null, date: Date, payload?: object): Promise<void>;
}
