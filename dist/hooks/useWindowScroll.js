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
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var SingletonListener_1 = __importDefault(require("../utils/dom/SingletonListener"));
function useWindowScroll() {
    var scrollX = framer_motion_1.useMotionValue(0);
    var scrollY = framer_motion_1.useMotionValue(0);
    var height = framer_motion_1.useMotionValue(1);
    var width = framer_motion_1.useMotionValue(1);
    var _a = __read(react_1.useState({
        scrollX: scrollX,
        scrollY: scrollY,
        height: height,
        width: width,
    }), 2), state = _a[0], setState = _a[1];
    react_1.useEffect(function () {
        var updateScrollValues = function () {
            scrollX.set(window.scrollX);
            scrollY.set(window.scrollY);
            height.set(window.innerHeight);
            width.set(window.innerWidth);
            setState(function (current) { return (__assign(__assign({}, current), { scrollX: scrollX,
                scrollY: scrollY,
                height: height,
                width: width })); });
        };
        var listener = SingletonListener_1.default.from(window);
        listener.addEventListener('resize', updateScrollValues);
        listener.addEventListener('scroll', updateScrollValues);
        return function () {
            listener.removeEventListener('resize', updateScrollValues);
            listener.removeEventListener('scroll', updateScrollValues);
        };
    });
    return state;
}
exports.default = useWindowScroll;
