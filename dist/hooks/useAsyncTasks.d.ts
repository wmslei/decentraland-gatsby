export declare type AsyncTaskIdenfity = (id: string, ...extra: any[]) => Promise<any>;
export default function useAsyncTasks<C extends AsyncTaskIdenfity = AsyncTaskIdenfity>(callback: C): readonly [string[], C];
