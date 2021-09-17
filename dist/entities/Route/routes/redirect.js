"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function redirect(to, status) {
    if (status === void 0) { status = 302; }
    return function (_, res) {
        res.status(status).redirect(to);
    };
}
exports.default = redirect;
