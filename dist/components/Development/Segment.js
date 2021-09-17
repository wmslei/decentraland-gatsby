"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
exports.default = react_1.default.memo(function Segment(_a) {
    var analyticsKey = _a.analyticsKey, analyticsJS = _a.analyticsJS, segmentKey = _a.segmentKey, src = _a.src, trackPage = _a.trackPage, props = __rest(_a, ["analyticsKey", "analyticsJS", "segmentKey", "src", "trackPage"]);
    segmentKey = segmentKey || analyticsKey || process.env.GATSBY_SEGMENT_KEY;
    if (!segmentKey) {
        console.warn("skipping segment inject: segmentKey and GATSBY_SEGMENT_KEY is missing'");
        return null;
    }
    return (react_1.default.createElement("script", __assign({}, props, { dangerouslySetInnerHTML: {
            __html: "\n(function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error(\"Segment snippet included twice.\");else{analytics.invoked=!0;analytics.methods=[\"trackSubmit\",\"trackClick\",\"trackLink\",\"trackForm\",\"pageview\",\"identify\",\"reset\",\"group\",\"track\",\"ready\",\"alias\",\"debug\",\"page\",\"once\",\"off\",\"on\"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement(\"script\");n.type=\"text/javascript\";n.async=!0;n.src=\"" + (src ||
                analyticsJS ||
                'https://segment.decentraland.org/v1/"+t+"/segment.min.js') + "\";var a=document.getElementsByTagName(\"script\")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION=\"4.1.0\";\nanalytics.load(\"" + segmentKey + "\"); " + ((trackPage && 'analytics.page();') || '') + "\n}})();",
        } })));
});
