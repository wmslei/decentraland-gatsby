import type { ConnectionResponse } from 'decentraland-connect/dist/types';
import type { AuthChain } from 'dcl-crypto/dist/types';
export default function identify(connection: ConnectionResponse): Promise<import("dcl-crypto/dist/types").AuthIdentity | null>;
export declare function ownerAddress(authChain: AuthChain): Promise<string>;
