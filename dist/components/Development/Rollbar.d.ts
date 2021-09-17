import React from 'react';
export declare type RollbarProps = React.ScriptHTMLAttributes<HTMLScriptElement> & React.HTMLProps<HTMLScriptElement> & {
    accessToken?: string;
    captureUncaught?: boolean;
    captureUnhandledRejections?: boolean;
    payload?: Record<string, string | number>;
};
declare const _default: React.NamedExoticComponent<RollbarProps>;
export default _default;
