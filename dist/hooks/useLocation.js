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
var SingletonListener_1 = __importDefault(require("../utils/dom/SingletonListener"));
function useLocation() {
    var _a = __read(react_1.useState(null), 2), location = _a[0], setLocation = _a[1];
    react_1.useEffect(function () {
        var listener = SingletonListener_1.default.from(window);
        var changeLocation = function () {
            return setLocation(new URL(window.location.toString()));
        };
        listener.addEventListener('hashchange', changeLocation);
        listener.addEventListener('popstate', changeLocation);
        changeLocation();
        return function () {
            listener.removeEventListener('hashchange', changeLocation);
            listener.removeEventListener('popstate', changeLocation);
        };
    }, []);
    return location;
}
exports.default = useLocation;
