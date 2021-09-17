export declare type Snapshot = {
    face: string;
    body: string;
};
export declare type BodyColor = {
    color: {
        r: number;
        g: number;
        b: number;
        a?: number;
    };
};
export declare type Avatar = {
    userId: string;
    email: string | null | undefined;
    name: string | null | undefined;
    hasClaimedName: boolean;
    description: string | null | undefined;
    ethAddress: string;
    version: number;
    avatar: {
        bodyShape: string;
        snapshots: Snapshot;
        eyes: BodyColor;
        hair: BodyColor;
        skin: BodyColor;
        wearables: string[];
        version: number;
    };
    inventory: string[];
    blocked: string[];
    tutorialStep: number;
};
export declare type ProfileResponse = {
    avatars: Avatar[];
};
export declare type Layer = {
    name: string;
    usersCount: number;
    maxUsers: number;
};
export declare type CommsStatusOptions = boolean | {} | {
    includeLayers: boolean;
} | {
    includeUsersParcels: boolean;
};
export declare type Status = CommsStatus;
export declare type StatusWithLayers = CommsStatusWithLayers;
export declare type CommsStatus = {
    name: string;
    version: string;
    currenTime: number;
    env: {
        secure: boolean;
        commitHash: string;
    };
    ready: boolean;
};
export declare type CommsStatusWithLayers = CommsStatus & {
    layers: (Layer & {
        usersParcels: Position[];
    })[];
};
export declare type CommsStatusWithUsers = CommsStatus & {
    usersCount: number;
    usersParcels: [number, number][];
};
export declare type LambdasStatus = {
    version: string;
    currentTime: number;
    contentServerUrl: string;
    commitHash: string;
};
export declare type ContentStatus = {
    name: string;
    version: string;
    currentTime: number;
    lastImmutableTime: number;
    historySize: number;
    synchronizationStatus: {
        otherServers: {
            address: string;
            connectionState: 'Connected' | 'Connection lost' | 'Could never be reached';
            lastDeploymentTimestamp: number;
        }[];
        lastSyncWithDAO: number;
        synchronizationState: 'Bootstrapping' | 'Syncing' | 'Synced' | 'Failed to sync';
        lastSyncWithOtherServers: number;
    };
    commitHash: string;
    ethNetwork: string;
};
export declare type Position = [number, number];
export declare type Position3D = {
    x: number;
    y: number;
    z: number;
};
export declare type Servers = {
    address: string;
    owner: string;
    id: string;
};
export declare type LayerUser = {
    id: string;
    userId: string;
    protocolVersion: number;
    peerId: string;
    parcel: [number, number];
    position: [number, number, number];
    lastPing: number;
    address: string;
};
export declare type EntityScene = {
    id: string;
    type: 'scene';
    timestamp: number;
    pointers: string[];
    content: {
        file: string;
        hash: string;
    }[];
    metadata: {
        display: {
            title: string | 'interactive-text';
            description?: string;
            navmapThumbnail?: string;
            favicon: 'favicon_asset';
        };
        contact: {
            name: string;
            email: string;
        };
        owner: string;
        scene: {
            parcels: string[];
            base: string;
        };
        communications: {
            type: 'webrtc';
            signalling: string;
        };
        policy: {
            contentRating: 'E' | 'T' | 'M';
            fly: boolean;
            voiceEnabled: boolean;
            blacklist: [];
        };
        main: string;
        tags: string[];
        spawnPoints: [{
            name: 'spawn1';
            default: boolean;
            position: Position3D;
            cameraTarget: Position3D;
        }];
    };
};
