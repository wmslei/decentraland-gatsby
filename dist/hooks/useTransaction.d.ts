import { ChainId } from '@dcl/schemas';
import { Transaction } from '../utils/tx/type';
declare type TransactionState = Transaction<any>[];
export default function useTransaction(address?: string | null, chainId?: ChainId | null): readonly [TransactionState, {
    readonly add: (hash: string, payload?: Record<string, any>) => void;
    readonly clear: () => void;
}];
export {};
