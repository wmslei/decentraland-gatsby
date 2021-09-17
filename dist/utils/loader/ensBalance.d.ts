import { ChainId } from '@dcl/schemas';
import 'isomorphic-fetch';
export { ChainId };
export declare function fetchEnsBalance(address: string, chainId: ChainId): Promise<number>;
