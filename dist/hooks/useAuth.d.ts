import { ChainId } from '@dcl/schemas';
import { ProviderType } from 'decentraland-connect/dist/types';
import { initialState } from './useAuth.utils';
export { initialState };
export default function useAuth(): readonly [string | null, {
    readonly connect: (providerType: ProviderType, chainId: ChainId) => void;
    readonly disconnect: () => void;
    readonly switchTo: (chainId: ChainId) => void;
    readonly select: (selecting?: boolean) => void;
    readonly loading: boolean;
    readonly error: string | null;
    readonly selecting: boolean;
    readonly provider: import("decentraland-connect/dist/types").Provider | null;
    readonly providerType: ProviderType | null;
    readonly chainId: ChainId | null;
}];
