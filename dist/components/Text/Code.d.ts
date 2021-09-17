import React from 'react';
import 'highlight.js/styles/github-gist.css';
import './Code.css';
export declare type CodeProps = React.Props<HTMLPreElement> & React.HTMLProps<HTMLSpanElement> & {
    inline?: boolean;
    note?: React.ReactNode;
    language?: 'json' | 'typescript' | 'javascript' | string;
};
declare const _default: React.NamedExoticComponent<CodeProps>;
export default _default;
