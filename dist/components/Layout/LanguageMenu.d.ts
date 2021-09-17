import React from 'react';
import { Locale } from 'decentraland-ui/dist/components/Language/Language';
import { GatsbyLinkProps } from 'gatsby';
import Responsive from 'semantic-ui-react/dist/commonjs/addons/Responsive/Responsive';
export declare const Label: {
    en: string;
    es: string;
    fr: string;
    ja: string;
    zh: string;
    ko: string;
};
export declare type HandleClick = (event: React.MouseEvent<GatsbyLinkProps<any>>) => void;
export declare type LanguageMenuProps = React.Props<Responsive> & {
    onClick?: HandleClick;
    languages?: Locale[];
    value?: Locale;
    to?: string;
};
export default function LanguageMenu(props: LanguageMenuProps): JSX.Element | null;
