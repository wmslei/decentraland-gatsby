/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import { PageProps } from 'gatsby';
import { Locale } from 'decentraland-ui/dist/components/LanguageIcon/LanguageIcon';
import { FooterProps } from 'decentraland-ui/dist/components/Footer/Footer';
import { NavbarProps } from 'decentraland-ui/dist/components/Navbar/Navbar';
import './Layout.css';
import { ProviderType } from 'decentraland-connect/dist/types';
export declare type LayoutProps = PageProps & NavbarProps & FooterProps & {
    pageContext?: {
        intl?: {
            language?: Locale;
            languages?: Locale[];
            originalPath?: string;
        };
    };
    availableProviders?: ProviderType[];
};
export default function Layout({ children, pageContext, availableProviders, ...props }: LayoutProps): JSX.Element;
