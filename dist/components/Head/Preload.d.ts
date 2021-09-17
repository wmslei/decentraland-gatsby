export declare type PreloadProps = {
    href?: string;
    as?: string;
    type?: string;
    media?: string;
};
export default function Preload(props: PreloadProps): JSX.Element | null;
export declare function preloadAs(href: string): "audio" | "font" | "image" | "script" | "style" | "video" | undefined;
export declare function preloadType(href: string): string | undefined;
