"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
function routes(handle, options) {
    if (options === void 0) { options = {}; }
    var router = express_1.Router(options);
    handle(router);
    return router;
}
exports.default = routes;
