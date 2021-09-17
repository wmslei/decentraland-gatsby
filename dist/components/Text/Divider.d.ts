import React from 'react';
import './Divider.css';
export declare type DividerProps = Omit<React.HTMLProps<HTMLDivElement>, 'size'> & {
    line?: boolean;
    size?: 'mini' | 'tiny' | 'small' | 'medium' | 'large' | 'big' | 'huge' | 'massive';
};
declare const _default: React.NamedExoticComponent<DividerProps>;
export default _default;
