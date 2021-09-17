import PropTypes from 'prop-types';
declare function HTML(props: any): JSX.Element;
declare namespace HTML {
    var propTypes: {
        htmlAttributes: PropTypes.Requireable<object>;
        headComponents: PropTypes.Requireable<any[]>;
        bodyAttributes: PropTypes.Requireable<object>;
        preBodyComponents: PropTypes.Requireable<any[]>;
        body: PropTypes.Requireable<string>;
        postBodyComponents: PropTypes.Requireable<any[]>;
    };
}
export default HTML;
