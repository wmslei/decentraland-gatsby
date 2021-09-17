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
var FetchError = /** @class */ (function (_super) {
    __extends(FetchError, _super);
    function FetchError(url, options, message) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, "Fail to fetch resource from \"" + url + "\": " + message) || this;
        _this.url = url;
        _this.options = options;
        _this.code = 'FETCH_ERROR';
        return _this;
    }
    return FetchError;
}(Error));
exports.default = FetchError;
