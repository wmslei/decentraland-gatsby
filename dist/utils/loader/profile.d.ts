/// <reference types="react" />
import { Avatar } from '../api/Catalyst';
import BatchLoader from './BatchLoader';
export declare type Profile = Omit<Avatar, 'avatar'> & Partial<Pick<Avatar, 'avatar'>> & {
    isDefaultProfile?: boolean;
};
export declare const createDefaultProfile: (address: string) => Profile;
declare const _default: BatchLoader<Profile, import("react").ReactText>;
export default _default;
