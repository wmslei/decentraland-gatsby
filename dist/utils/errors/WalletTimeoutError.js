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
var WalletTimeoutError = /** @class */ (function (_super) {
    __extends(WalletTimeoutError, _super);
    function WalletTimeoutError(message) {
        if (message === void 0) { message = 'Could not connect to Ethereum'; }
        var _this = _super.call(this, message) || this;
        _this.code = 'TIMEOUT_ERROR';
        return _this;
    }
    return WalletTimeoutError;
}(Error));
exports.default = WalletTimeoutError;
