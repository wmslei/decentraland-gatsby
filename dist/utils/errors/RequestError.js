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
    function RequestError(url, options, res, body) {
        var _this = _super.call(this, "Error fetching data from \"" + url + "\"" + (body && body.message
            ? ': ' + body.message
            : body && body.error
                ? ': ' + body.error
                : body
                    ? ': ' + JSON.stringify(body)
                    : '')) || this;
        _this.url = url;
        _this.options = options;
        _this.headers = {};
        res.headers.forEach(function (value, key) {
            _this.headers[key] = value;
        });
        _this.code = res.status >= 500 ? 'SERVER_ERROR' : 'REQUEST_ERROR';
        _this.statusCode = res.status;
        _this.body = body;
        return _this;
    }
    return RequestError;
}(Error));
exports.default = RequestError;
