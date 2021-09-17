import type { ChainId } from '@dcl/schemas';
import { Transaction } from './type';
export declare function storeTransactions(address: string, chainId: ChainId, txs: Transaction[]): Transaction<any>[];
export declare function restoreTransactions(address: string, chainId: ChainId): Transaction[];
export declare function clearTransactions(address: string, chainId: ChainId): void;
