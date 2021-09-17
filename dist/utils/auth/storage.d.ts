import { Identity } from './types';
export declare function isExpired(identity?: Identity): boolean;
export declare function isValid(identity?: Identity): boolean;
export declare function setCurrentIdentity(identity: Identity | null): import("dcl-crypto/dist/types").AuthIdentity | null;
export declare function getCurrentIdentity(): import("dcl-crypto/dist/types").AuthIdentity | null;
