"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = void 0;
var react_1 = __importDefault(require("react"));
var gatsby_plugin_intl_1 = require("gatsby-plugin-intl");
var Menu_1 = __importDefault(require("semantic-ui-react/dist/commonjs/collections/Menu/Menu"));
var Responsive_1 = __importDefault(require("semantic-ui-react/dist/commonjs/addons/Responsive/Responsive"));
var trackEvent_1 = __importDefault(require("../../utils/segment/trackEvent"));
exports.Label = {
    en: 'ENG',
    es: 'ESP',
    fr: 'FRA',
    ja: '日本語',
    zh: '中文',
    ko: 'KOR',
};
function LanguageMenu(props) {
    if (!props.languages || props.languages.length < 2) {
        return null;
    }
    var minWidth = Responsive_1.default.onlyTablet.minWidth;
    function handleClick(event) {
        if (props.onClick) {
            props.onClick(event);
        }
    }
    return (react_1.default.createElement(Responsive_1.default, { as: Menu_1.default, secondary: true, stackable: true, minWidth: minWidth }, props.languages.map(function (lang) { return (react_1.default.createElement(Menu_1.default.Item, { key: lang, as: gatsby_plugin_intl_1.Link, active: props.value === lang, language: lang, onClick: trackEvent_1.default(handleClick), to: props.to || '/' }, exports.Label[lang])); })));
}
exports.default = LanguageMenu;
