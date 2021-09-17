import React from 'react';
import { SizeProps } from '../Props/types';
import './Avatar.css';
declare type Props = SizeProps & {
    src?: string;
    address?: string;
};
export declare type AvatarProps = Omit<React.HTMLProps<HTMLImageElement>, 'height' | 'width' | 'size' | 'src'> & Props;
declare const _default: React.NamedExoticComponent<AvatarProps>;
export default _default;
