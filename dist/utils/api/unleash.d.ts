import 'isomorphic-fetch';
export declare type FeatureFlagsResponse = {
    flags: Record<string, boolean>;
    variants: Record<string, Variant>;
};
export declare type Variant = {
    name: string;
    enabled: boolean;
    payload?: {
        type: string;
        value: string;
    };
};
export declare type UnleashOptions = {
    debug: boolean;
    address: string;
    referer: string;
};
export declare const DEFAULT_FEATURE_FLAG: FeatureFlagsResponse;
export default function unleash(endpoint?: string | null, options?: Partial<UnleashOptions>): Promise<FeatureFlagsResponse>;
