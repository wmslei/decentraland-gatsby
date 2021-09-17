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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var react_1 = __importStar(require("react"));
var useAsyncMemo_1 = __importDefault(require("../../hooks/useAsyncMemo"));
var variables_1 = require("../../variables");
var TokenList_1 = __importDefault(require("../../utils/dom/TokenList"));
var profile_1 = __importDefault(require("../../utils/loader/profile"));
require("./Avatar.css");
var DEFAULT_AVATAR = 'https://decentraland.org/images/male.png';
exports.default = react_1.default.memo(function Avatar(_a) {
    var address = _a.address, size = _a.size, src = _a.src, props = __rest(_a, ["address", "size", "src"]);
    var _b = __read(react_1.useState(false), 2), failed = _b[0], setFailed = _b[1];
    var _c = __read(useAsyncMemo_1.default(function () { return profile_1.default.load(address || ''); }, [address], { callWithTruthyDeps: true }), 2), profile = _c[0], loading = _c[1].loading;
    var target = react_1.useMemo(function () {
        var _a, _b, _c, _d;
        if (src) {
            return src;
        }
        else if (failed || !((_b = (_a = profile === null || profile === void 0 ? void 0 : profile.avatar) === null || _a === void 0 ? void 0 : _a.snapshots) === null || _b === void 0 ? void 0 : _b.face)) {
            return DEFAULT_AVATAR;
        }
        else {
            return (_d = (_c = profile === null || profile === void 0 ? void 0 : profile.avatar) === null || _c === void 0 ? void 0 : _c.snapshots) === null || _d === void 0 ? void 0 : _d.face;
        }
    }, [profile, failed]);
    return (react_1.default.createElement("img", __assign({ loading: "lazy" }, props, { src: target, onError: function () { return setFailed(true); }, width: "128", height: "128", className: TokenList_1.default.join([
            variables_1.StyleNamespace,
            'dcl-avatar',
            "dcl-avatar--" + size,
            "dcl-avatar--" + ((address || '')[2] || '').toLowerCase(),
            !src && loading && "dcl-avatar--loading",
            props.className,
        ]) })));
});
