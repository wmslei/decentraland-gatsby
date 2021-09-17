"use strict";
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
var Responsive_1 = __importDefault(require("semantic-ui-react/dist/commonjs/addons/Responsive"));
var react_1 = require("react");
var SingletonListener_1 = __importDefault(require("../utils/dom/SingletonListener"));
var CURRENT_WIDTH = Responsive_1.default.onlyMobile.maxWidth;
function useResponsive() {
    var _a = __read(react_1.useState(CURRENT_WIDTH), 2), width = _a[0], setWidth = _a[1];
    react_1.useEffect(function () {
        function updateWidth() {
            var currentWidth = window.innerWidth;
            if (CURRENT_WIDTH !== currentWidth) {
                CURRENT_WIDTH = currentWidth;
            }
            if (width !== currentWidth) {
                setWidth(currentWidth);
            }
        }
        updateWidth();
        var listener = SingletonListener_1.default.from(window);
        listener.addEventListener('resize', updateWidth);
        return function () {
            listener.removeEventListener('resize', updateWidth);
        };
    }, []);
    return function responsive(limits) {
        if (limits === void 0) { limits = {}; }
        if (limits.minWidth !== undefined && width < limits.minWidth) {
            return false;
        }
        if (limits.maxWidth !== undefined && width > limits.maxWidth) {
            return false;
        }
        return true;
    };
}
exports.default = useResponsive;
