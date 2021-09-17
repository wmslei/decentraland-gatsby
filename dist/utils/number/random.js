"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function random(from, to) {
    if (from === void 0) { from = 0; }
    if (to === undefined) {
        to = from;
        from = 0;
    }
    var innerFrom = from < to ? from : to;
    var innerTo = from < to ? to : from;
    var order = from < to ? 1 : -1;
    var value = Math.random() * Math.abs(Math.abs(innerTo) - Math.abs(innerFrom)) * order;
    return from + (value > 0 ? Math.floor(value) : Math.ceil(value));
}
exports.default = random;
