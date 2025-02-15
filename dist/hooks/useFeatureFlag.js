"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_FEATURE_FLAG = void 0;
var unleash_1 = __importStar(require("../utils/api/unleash"));
Object.defineProperty(exports, "DEFAULT_FEATURE_FLAG", { enumerable: true, get: function () { return unleash_1.DEFAULT_FEATURE_FLAG; } });
var useAsyncMemo_1 = __importDefault(require("./useAsyncMemo"));
function useFeatureFlag(endpoint) {
    return useAsyncMemo_1.default(function () { return unleash_1.default(endpoint); }, [endpoint], {
        callWithTruthyDeps: true,
        initialValue: unleash_1.DEFAULT_FEATURE_FLAG,
    });
}
exports.default = useFeatureFlag;
