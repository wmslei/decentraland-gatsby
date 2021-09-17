import React from 'react';
import { ImgFixedProps } from '../Image/ImgFixed';
import './ImageInput.css';
export declare type ImageInputProps = Omit<React.HTMLProps<HTMLInputElement>, 'value'> & {
    onFileChange?: (file: File) => void;
    value?: string;
    label?: string;
    message?: React.ReactNode;
    error?: boolean;
    loading?: boolean;
    dimension?: ImgFixedProps['dimension'];
};
export default function ImageInput({ value, error, loading, label, message, dimension, className, ...props }: ImageInputProps): JSX.Element;
