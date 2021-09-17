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
var useAuthContext_1 = __importDefault(require("./useAuthContext"));
var useAsyncMemo_1 = require("../../hooks/useAsyncMemo");
var utils_1 = require("./utils");
var fakeState = useAsyncMemo_1.createAsyncMemoState(utils_1.getDefaultChainId());
/**
 *
 * @returns
 */
function useChainIdContext() {
    var _a = __read(useAuthContext_1.default(), 2), chainId = _a[1].chainId;
    return [chainId, fakeState];
}
exports.default = useChainIdContext;
