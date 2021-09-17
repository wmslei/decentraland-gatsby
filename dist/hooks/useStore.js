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
var EntityStore_1 = __importDefault(require("../utils/EntityStore"));
var INITIAL_STATE = {};
function useStore(initialState, deps) {
    if (initialState === void 0) { initialState = INITIAL_STATE; }
    if (deps === void 0) { deps = []; }
    var store = react_1.useMemo(function () { return new EntityStore_1.default({ initialState: initialState }); }, deps);
    var _a = __read(react_1.useState(store.getState()), 2), current = _a[0], setState = _a[1];
    react_1.useEffect(function () {
        function handleChange(newState) {
            if (current !== newState) {
                setState(newState);
            }
        }
        store.addEventListener('change', handleChange);
        return function () { return store.removeEventListener('change', handleChange); };
    }, [store]);
    return store;
}
exports.default = useStore;
