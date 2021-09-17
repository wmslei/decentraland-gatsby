export default function useAuthContext(): readonly [string | null, {
    readonly connect: (providerType: import("decentraland-connect/dist").ProviderType, chainId: import("@dcl/schemas").ChainId) => void;
    readonly disconnect: () => void;
    readonly switchTo: (chainId: import("@dcl/schemas").ChainId) => void;
    readonly select: (selecting?: boolean) => void;
    readonly loading: boolean;
    readonly error: string | null;
    readonly selecting: boolean;
    readonly provider: import("decentraland-connect/dist").Provider | null;
    readonly providerType: import("decentraland-connect/dist").ProviderType | null;
    readonly chainId: import("@dcl/schemas").ChainId | null;
}];