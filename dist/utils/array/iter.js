"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function iter(amount, map) {
    if (!Number.isFinite(amount) || amount <= 0) {
        return [];
    }
    var maxIndex = amount - 1;
    return Array.from(new Array(amount), function (_, currentIndex) {
        return map(currentIndex, maxIndex);
    });
}
exports.default = iter;
