import React from 'react';
import { ProviderType } from 'decentraland-connect/dist/types';
import './WalletSelectorModal.css';
import { ChainId } from '../../utils/loader/ensBalance';
export declare type WalletSelectorProps = {
    open?: boolean;
    loading?: boolean;
    error?: string | null;
    availableProviders?: ProviderType[];
    onConnect?: (providerType: ProviderType, chainId: ChainId) => void;
    onClose?: () => void;
};
declare const _default: React.NamedExoticComponent<WalletSelectorProps>;
export default _default;
