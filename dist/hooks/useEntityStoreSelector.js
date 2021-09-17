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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var defaultSelector = function (state) { return state; };
function useEntityStoreSelector(store, selector) {
    if (selector === void 0) { selector = defaultSelector; }
    var _a = __read(react_1.useState(store.getState()), 2), state = _a[0], setState = _a[1];
    var result = react_1.useMemo(function () { return selector(state); }, [state, selector]);
    react_1.useEffect(function () {
        function handleChange(newState) {
            if (state !== newState) {
                setState(newState);
            }
        }
        store.addEventListener('change', handleChange);
        return function removeStoreListener() {
            store.removeEventListener('change', handleChange);
        };
    }, []);
    return result;
}
exports.default = useEntityStoreSelector;
