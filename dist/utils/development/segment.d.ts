/// <reference types="segment-analytics" />
export declare type TrackContext = {
    wallet: boolean | string;
    mobile: boolean;
};
export declare type Tracker = (segment: SegmentAnalytics.AnalyticsJS, context: TrackContext) => void;
export default function segment(tracker: Tracker): void;
