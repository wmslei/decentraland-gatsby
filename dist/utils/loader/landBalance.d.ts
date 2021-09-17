import { ChainId } from '@dcl/schemas';
import 'isomorphic-fetch';
export { ChainId };
export declare function fetchLandBalance(address: string, chainId: ChainId): Promise<number>;
