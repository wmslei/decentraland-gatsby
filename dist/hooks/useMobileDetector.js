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
var react_1 = require("react");
var isMobile_1 = __importDefault(require("../utils/isMobile"));
var IS_MOBILE = null;
function useMobileDetector(initialValue) {
    if (initialValue === void 0) { initialValue = IS_MOBILE !== null && IS_MOBILE !== void 0 ? IS_MOBILE : false; }
    var _a = __read(react_1.useState(initialValue), 2), mobile = _a[0], setMobile = _a[1];
    react_1.useEffect(function () {
        if (IS_MOBILE === null) {
            IS_MOBILE = isMobile_1.default();
            if (IS_MOBILE !== mobile) {
                setMobile(IS_MOBILE);
            }
        }
    }, []);
    return mobile;
}
exports.default = useMobileDetector;
