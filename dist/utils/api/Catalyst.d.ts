import type { AuthChain } from 'dcl-crypto';
import type { Address } from 'web3x/address';
import API from './API';
export type { Snapshot, BodyColor, Avatar, ProfileResponse, Layer, Status, StatusWithLayers, CommsStatus, CommsStatusWithLayers, LambdasStatus, ContentStatus, Position, Servers, LayerUser, EntityScene, } from './Catalyst.types';
import type { Avatar, Layer, CommsStatus, CommsStatusWithLayers, LambdasStatus, ContentStatus, Position, Servers, LayerUser, EntityScene, CommsStatusWithUsers } from './Catalyst.types';
export default class Catalyst extends API {
    static Url: string;
    static Servers: Promise<void> | null;
    static Cache: Map<string, Catalyst>;
    static get(): Catalyst;
    static getAny(): Promise<Catalyst>;
    static from(baseUrl: string): Catalyst;
    private available;
    getProfile(address: Address | string): Promise<Avatar | null>;
    /**
     * loads profile data in parallel
     *
     * @param addresses - profile addresses list
     * @returns array of profiles in the same order used in the addresses param,
     *  if the profile doesn't exists the array will include a `null` in the corresponding
     *  position
     *
     * @example
     * ```typescript
     * getProfiles([ `0x1234...`, 0x00000 ]) => Promise<[ { user: `0x1234...`, ...profile }, null ]>
     * ```
     */
    getProfiles(addresses: (Address | string)[]): Promise<(Avatar | null)[]>;
    getStatus(): Promise<CommsStatus>;
    getStatus(includeLayers: {}): Promise<CommsStatus>;
    getStatus(includeLayers: false): Promise<CommsStatus>;
    getStatus(includeLayers: true): Promise<CommsStatusWithLayers>;
    getStatus(includeLayers: {
        includeLayers: true;
    }): Promise<CommsStatusWithLayers>;
    getStatus(includeLayers: {
        includeUsersParcels: true;
    }): Promise<CommsStatusWithUsers>;
    getCommsStatus(): Promise<CommsStatus>;
    getCommsStatus(includeLayers: {}): Promise<CommsStatus>;
    getCommsStatus(includeLayers: false): Promise<CommsStatus>;
    getCommsStatus(includeLayers: true): Promise<CommsStatusWithLayers>;
    getCommsStatus(includeLayers: {
        includeLayers: true;
    }): Promise<CommsStatusWithLayers>;
    getCommsStatus(includeLayers: {
        includeUsersParcels: true;
    }): Promise<CommsStatusWithUsers>;
    getLambdasStatus(): Promise<LambdasStatus>;
    getContentStatus(): Promise<ContentStatus>;
    getContentUrl(hash: string): string;
    getEntityScenes(pointers: (string | [number, number])[]): Promise<EntityScene[]>;
    getServers(): Promise<Servers[]>;
    getPOIs(): Promise<Position[]>;
    getBanNames(): Promise<string[]>;
    /**
     * @deprecated by the archipelago update
     * @see https://decentraland.org/blog/project-updates/communication-protocol-improvements/
     * @see https://github.com/decentraland/adr/blob/main/docs/ADR-35-coms-protocol-optimizations.md
     */
    getLayers(): Promise<Layer[]>;
    /**
     * @deprecated by the archipelago update
     * @see https://decentraland.org/blog/project-updates/communication-protocol-improvements/
     * @see https://github.com/decentraland/adr/blob/main/docs/ADR-35-coms-protocol-optimizations.md
     */
    getLayerUsers(layer: string): Promise<LayerUser[]>;
    verifySignature(authChain: AuthChain, message: string): Promise<object>;
}
