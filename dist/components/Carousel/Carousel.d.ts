import React from 'react';
import './Carousel.css';
export declare type CarouselProps = React.HTMLProps<HTMLDivElement> & {
    onMove?: (index: number) => void;
    progress?: boolean;
    time?: number | false;
};
export declare type CarouselState = {
    current: number;
    running: boolean;
    timer: number | null;
};
export declare function Next(): JSX.Element;
export declare function Prev(): JSX.Element;
export default function Carousel({ className, children, progress, onMove, time, ...props }: CarouselProps): JSX.Element;
