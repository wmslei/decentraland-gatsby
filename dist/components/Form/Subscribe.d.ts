import React from 'react';
import 'isomorphic-fetch';
import './Subscribe.css';
export declare type SubscribeData = {
    email: string;
    interest?: string;
    lang?: string;
};
export declare type SubscribeProps = {
    className?: string;
    action?: string;
    method?: 'POST' | 'GET';
    intl?: {
        cta?: string;
        inputError?: string;
        serverError?: string;
    };
    lang?: string;
    interest?: string;
    placeholder?: string;
    defaultValue?: string;
    onSubmit?: (event: React.FormEvent<HTMLFormElement>, data: SubscribeData) => void;
    onSubscribe?: (data: SubscribeData) => void;
    disabled?: boolean;
    loading?: boolean;
    primary?: boolean;
    inverted?: boolean;
    basic?: boolean;
    error?: ErrorKind;
};
export declare type SubscribeState = {
    email: string;
    loading: boolean;
    error: ErrorKind;
};
export declare enum ErrorKind {
    None = 0,
    InvalidEmail = 1,
    ServerError = 2
}
export default function Subscribe(props: SubscribeProps): JSX.Element;
