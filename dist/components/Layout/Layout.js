"use strict";
/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var gatsby_plugin_intl_1 = require("gatsby-plugin-intl");
var trackEvent_1 = __importDefault(require("../../utils/segment/trackEvent"));
var Footer_1 = require("decentraland-ui/dist/components/Footer/Footer");
var Navbar_1 = require("decentraland-ui/dist/components/Navbar/Navbar");
var WalletSelectorModal_1 = __importDefault(require("../Modal/WalletSelectorModal"));
var WrongNetworkModal_1 = __importDefault(require("../Modal/WrongNetworkModal"));
var useWindowScroll_1 = __importDefault(require("../../hooks/useWindowScroll"));
var useAuthContext_1 = __importDefault(require("../../context/Auth/useAuthContext"));
var TokenList_1 = __importDefault(require("../../utils/dom/TokenList"));
require("./Layout.css");
var utils_1 = require("../../context/Auth/utils");
function Layout(_a) {
    var _b, _c, _d;
    var children = _a.children, pageContext = _a.pageContext, availableProviders = _a.availableProviders, props = __rest(_a, ["children", "pageContext", "availableProviders"]);
    var language = ((_b = pageContext === null || pageContext === void 0 ? void 0 : pageContext.intl) === null || _b === void 0 ? void 0 : _b.language) || 'en';
    var languages = ((_c = pageContext === null || pageContext === void 0 ? void 0 : pageContext.intl) === null || _c === void 0 ? void 0 : _c.languages) || ['en'];
    var currentPath = ((_d = pageContext === null || pageContext === void 0 ? void 0 : pageContext.intl) === null || _d === void 0 ? void 0 : _d.originalPath) || '/';
    var _e = __read(useAuthContext_1.default(), 2), state = _e[1];
    var scroll = useWindowScroll_1.default();
    var isScrolled = scroll.scrollY.get() > 0;
    var handleChangeLocal = function (_, data) {
        gatsby_plugin_intl_1.changeLocale(data.value, currentPath);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Navbar_1.Navbar, { mana: props.mana, address: props.address, activePage: props.activePage, leftMenu: props.leftMenu, middleMenu: props.middleMenu, rightMenu: props.rightMenu, i18n: props.i18n, isConnected: props.isConnected, isConnecting: props.isConnecting, isSignIn: props.isSignIn, isFullscreen: props.isFullscreen, isOverlay: props.isOverlay, className: TokenList_1.default.join([
                'LayoutNavbarContainer',
                props.className,
                !isScrolled && 'initial',
            ]), onSignIn: props.onSignIn, onClickAccount: props.onClickAccount }),
        react_1.default.createElement("main", { className: TokenList_1.default.join(['LayoutMainContainer', props.className]) }, children),
        react_1.default.createElement(WrongNetworkModal_1.default, { currentNetwork: state.chainId, expectedNetwork: utils_1.getSupportedChainIds(), onSwitchNetwork: function (chainId) { return state.switchTo(chainId); }, providerType: state.providerType }),
        react_1.default.createElement(WalletSelectorModal_1.default, { open: state.selecting, loading: state.loading, error: state.error, onConnect: function (providerType, chainId) {
                return state.connect(providerType, chainId);
            }, availableProviders: availableProviders, onClose: function () { return state.select(false); } }),
        react_1.default.createElement(Footer_1.Footer, { locale: language, locales: languages, isFullscreen: props.isFullscreen, className: TokenList_1.default.join(['LayoutFooterContainer', props.className]), i18n: props.i18n, onChange: trackEvent_1.default(handleChangeLocal) })));
}
exports.default = Layout;
