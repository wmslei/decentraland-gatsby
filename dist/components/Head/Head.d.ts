/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import React from 'react';
import { Locale } from 'decentraland-ui/dist/components/Language/Language';
export declare type MetaProps = JSX.IntrinsicElements['meta'];
export declare type HeadProps = React.Props<any> & {
    lang?: Locale;
    title?: string;
    titleTemplate?: string | null;
    defaultTitle?: string | null;
    description?: string;
    image?: string;
    meta: Partial<MetaProperties>;
};
export declare type MetaProperties = {
    'og:title': string;
    'og:type': 'article' | 'book' | 'profile' | 'website' | string;
    'og:description': string;
    'og:url': string;
    'og:site_name': string;
    'og:video': string;
    'og:image': string;
    'og:image:width': number;
    'og:image:height': number;
    'twitter:card': 'summary' | 'summary_large_image' | 'player';
    'twitter:site': string;
    'twitter:creator': string;
    'twitter:title': string;
    'twitter:description': string;
    'twitter:image': string;
    'twitter:image:alt': string;
    'twitter:player': string;
    'twitter:player:width': number;
    'twitter:player:height': number;
    'twitter:player:stream': string;
};
declare function Head(props: HeadProps): JSX.Element;
declare namespace Head {
    var defaultProps: {
        lang: string;
        meta: {};
        title: string;
        description: string;
    };
}
export default Head;
