import React from 'react';
import './ImgFixed.css';
export declare type ImgFixedProps = Omit<React.HTMLProps<HTMLDivElement>, 'size'> & {
    dimension?: 'square' | 'wide' | 'vertical' | 'circle' | 'standard';
    position?: string;
    size?: 'cover' | 'contain' | 'initial' | string;
    background?: string;
};
declare const _default: React.NamedExoticComponent<ImgFixedProps>;
export default _default;
