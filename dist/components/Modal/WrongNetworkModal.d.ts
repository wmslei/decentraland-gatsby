import React from 'react';
import { ChainId } from '@dcl/schemas';
import { ProviderType } from 'decentraland-connect/dist/types';
import { ModalProps } from 'decentraland-ui/dist/components/Modal/Modal';
declare const defaultI18n: {
    header: string;
    message: string;
    change_chain: string;
    separator: string;
    unknown_chain: string;
};
export declare type WrongNetworkModalProps = ModalProps & {
    currentNetwork?: ChainId | null;
    expectedNetwork?: ChainId | ChainId[];
    providerType?: ProviderType | null;
    i18n?: Partial<typeof defaultI18n>;
    onSwitchNetwork?: (chainId: ChainId) => void;
};
declare const _default: React.NamedExoticComponent<WrongNetworkModalProps>;
export default _default;
