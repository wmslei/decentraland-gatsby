import { ChainId } from '@dcl/schemas';
import 'isomorphic-fetch';
export { ChainId };
export declare function fetchEstateBalance(address: string, chainId: ChainId): Promise<readonly [number, number]>;
