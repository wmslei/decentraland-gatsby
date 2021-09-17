import React from 'react';
export declare type SegmentProps = React.Props<HTMLScriptElement> & React.HTMLProps<HTMLScriptElement> & {
    /** @deprecated use segmentKey instead */
    analyticsKey?: string;
    /** @deprecated use src instead */
    analyticsJS?: string;
    /** Segment key */
    segmentKey?: string;
    /** Alternative source */
    src?: string;
    /** Alternative source */
    trackPage?: boolean;
};
declare const _default: React.NamedExoticComponent<SegmentProps>;
export default _default;
