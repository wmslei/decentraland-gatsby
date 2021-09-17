/// <reference types="react" />
import { MANA_GRAPH_BY_CHAIN_ID } from 'decentraland-dapps/dist/lib/chainConfiguration';
import Loader from './Loader';
export declare type ChainId = keyof typeof MANA_GRAPH_BY_CHAIN_ID;
export declare function fetchManaBalance(address: string, chainId: ChainId): Promise<number>;
export default function manaBalance(chainId: ChainId): Loader<number, import("react").ReactText>;
