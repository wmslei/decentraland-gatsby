import React from 'react';
import './Background.css';
export declare type BackgroundProps = React.Props<HTMLDivElement> & React.HTMLProps<HTMLDivElement> & {
    src?: string;
};
export default function Background({ src, ...props }: BackgroundProps): JSX.Element;
