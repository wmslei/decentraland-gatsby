import { ChainId } from '@dcl/schemas';
import { Provider, ProviderType } from 'decentraland-connect/dist/types';
import { Identity } from '../utils/auth';
import SingletonListener from '../utils/dom/SingletonListener';
import { AddEthereumChainParameters } from 'decentraland-dapps/dist/modules/wallet/types';
export declare const chains: ChainId[];
export declare enum AuthEvent {
    Connect = "Connect",
    Connected = "Connected",
    Disconnected = "Disconnected"
}
export declare enum AuthStatus {
    Restoring = 0,
    Disconnected = 1,
    Connected = 2,
    Connecting = 3,
    Disconnecting = 4
}
export declare type AuthState = {
    selecting: boolean;
    account: string | null;
    identity: Identity | null;
    provider: Provider | null;
    providerType: ProviderType | null;
    chainId: ChainId | null;
    error: string | null;
    status: AuthStatus;
};
export declare const initialState: AuthState;
export declare function getListener(): SingletonListener<Window>;
export declare function fetchAccounts(provider: Provider): Promise<string[]>;
export declare function fetchChainId(provider: Provider): Promise<number>;
export declare function restoreConnection(): Promise<AuthState>;
export declare function createConnection(providerType: ProviderType, chainId: ChainId): Promise<{
    account: string;
    identity: import("dcl-crypto").AuthIdentity;
    chainId: number;
    providerType: ProviderType;
    status: AuthStatus;
    provider: Provider;
    selecting: boolean;
    error: null;
} | {
    status: AuthStatus;
    error: any;
    selecting: boolean;
    account: string | null;
    identity: import("dcl-crypto").AuthIdentity | null;
    provider: Provider | null;
    providerType: ProviderType | null;
    chainId: ChainId | null;
}>;
export declare function isLoading(status: AuthStatus): boolean;
export declare function switchToChainId(provider: Provider | null, chainId: ChainId): Promise<void>;
export declare function getAddEthereumChainParameters(chainId: ChainId): AddEthereumChainParameters;
