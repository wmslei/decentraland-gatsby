import { MotionProps } from 'framer-motion';
import './Image.css';
export declare type ImageProps = MotionProps & {
    className?: string;
    src?: string;
    background?: boolean;
    backgroundSize?: number | string;
    width?: number | string;
    height?: number | string;
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
};
export default function Image({ src, className, background, backgroundSize, ...props }: ImageProps): JSX.Element;
