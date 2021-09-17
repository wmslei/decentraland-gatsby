import type Rollbar from 'rollbar';
export declare type RollbarTracker = (rollbar: Rollbar) => void;
export default function rollbar(tracker: RollbarTracker): void;
