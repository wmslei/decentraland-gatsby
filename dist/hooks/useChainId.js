"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../context/Auth/utils");
function useChainId() {
    return utils_1.getChainId();
}
exports.default = useChainId;
