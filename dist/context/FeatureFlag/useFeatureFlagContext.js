"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var FeatureFlagProvider_1 = require("./FeatureFlagProvider");
function useFeatureFlagContext() {
    return react_1.useContext(FeatureFlagProvider_1.FeatureFlagContext);
}
exports.default = useFeatureFlagContext;
