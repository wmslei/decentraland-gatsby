"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function roundRobin(items) {
    if (items.length === 0) {
        throw new Error("Round Robin required at least 1 item");
    }
    var current = 0;
    return function roundRobinGetter() {
        var result = items[current];
        current = current === items.length - 1 ? 0 : current + 1;
        return result;
    };
}
exports.default = roundRobin;
