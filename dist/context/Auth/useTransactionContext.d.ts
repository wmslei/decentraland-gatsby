export default function useTransactionContext(): readonly [import("../../utils/tx/type").Transaction<any>[], {
    readonly add: (hash: string, payload?: Record<string, any>) => void;
    readonly clear: () => void;
}];
