import React from 'react';
import './Paragraph.css';
export declare type ParagraphProps = React.Props<HTMLParagraphElement> & React.HTMLProps<HTMLParagraphElement> & {
    primary?: boolean;
    secondary?: boolean;
    small?: boolean;
    tiny?: boolean;
    italic?: boolean;
    bold?: boolean;
    semiBold?: boolean;
    underline?: boolean;
    uppercase?: boolean;
};
declare const _default: React.NamedExoticComponent<ParagraphProps>;
export default _default;
