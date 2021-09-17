import type { ChainId } from '@dcl/schemas';
import type { AnyTransaction, TransactionStatus } from 'decentraland-dapps/dist/modules/transaction/types';
export { TransactionStatus };
export declare type Transaction<P extends {} = any> = AnyTransaction & {
    timestamp: number;
    chainId: ChainId;
    payload: P;
};
