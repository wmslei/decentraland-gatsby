/// <reference types="react" />
export declare type HandleEvent = (event: React.SyntheticEvent<HTMLElement>, ...extra: any[]) => any;
export default function trackEvent<H extends HandleEvent>(handle: H): (event: React.MouseEvent<HTMLElement>, ...extra: any[]) => void;
