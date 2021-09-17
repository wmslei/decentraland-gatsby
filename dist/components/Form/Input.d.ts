import React from 'react';
import './Input.css';
export declare type InputProps = Omit<React.HTMLProps<HTMLInputElement>, 'size'> & {
    error?: boolean;
    message?: React.ReactNode;
    verticalAlign?: 'top' | 'bottom' | 'middle';
    size?: 'mini' | 'tiny' | 'small' | 'medium' | 'large' | 'big' | 'huge' | 'massive';
};
export default function Input({ className, size, message, verticalAlign, error, ...props }: InputProps): JSX.Element;
