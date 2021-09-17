"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getUserAgent() {
    var _a, _b;
    return (((_a = window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent) || ((_b = window.navigator) === null || _b === void 0 ? void 0 : _b.vendor) ||
        window.opera);
}
exports.default = getUserAgent;
