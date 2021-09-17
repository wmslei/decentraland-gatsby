/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import PropTypes from 'prop-types';
import { Locale } from 'decentraland-ui/dist/components/Language/Language';
export declare type MetaProps = JSX.IntrinsicElements['meta'];
export declare type SEOProps = {
    title: string;
    titleTemplate?: string | null;
    description?: string | null;
    twitter?: string | null;
    author?: string | null;
    lang?: Locale;
    preload?: string[];
    meta?: MetaProps[];
};
declare function SEO({ description, lang, meta, title, titleTemplate, author, preload, }: SEOProps): JSX.Element;
declare namespace SEO {
    var defaultProps: {
        lang: string;
        meta: never[];
        preload: never[];
        description: string;
    };
    var propTypes: {
        description: PropTypes.Requireable<string>;
        lang: PropTypes.Requireable<string>;
        meta: PropTypes.Requireable<(object | null | undefined)[]>;
        title: PropTypes.Validator<string>;
    };
}
export default SEO;
