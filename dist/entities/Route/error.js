"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var RequestError = /** @class */ (function (_super) {
    __extends(RequestError, _super);
    function RequestError(message, statusCode, data) {
        if (statusCode === void 0) { statusCode = RequestError.InternalServerError; }
        var _this = _super.call(this, message) || this;
        _this.statusCode = statusCode;
        _this.data = data;
        return _this;
    }
    RequestError.toJSON = function (err) {
        var result = {
            ok: false,
            error: err.message,
        };
        if (err.data) {
            result.data = err.data;
        }
        if (result.stack && process.env.NODE_ENV !== 'production') {
            result.stack = err.stack;
        }
        return result;
    };
    RequestError.BadRequest = 400;
    RequestError.Unauthorized = 401;
    RequestError.Forbidden = 403;
    RequestError.NotFound = 404;
    RequestError.PayloadTooLarge = 413;
    RequestError.IAmATeapot = 418;
    RequestError.TooManyRequests = 429;
    RequestError.InternalServerError = 500;
    RequestError.NotImplemented = 501;
    RequestError.ServiceUnavailable = 503;
    return RequestError;
}(Error));
exports.default = RequestError;
