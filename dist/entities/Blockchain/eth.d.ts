import { Eth } from 'web3x/eth';
import { HttpProvider, WebsocketProvider } from 'web3x/providers';
export declare function fromEndpoint(endpoint: string): HttpProvider | WebsocketProvider | null;
export declare function getCurrentProviders(): (HttpProvider | WebsocketProvider)[];
export declare function getEths(): Eth[];
export declare function getEthPool(): import("generic-pool").Pool<Eth>;
