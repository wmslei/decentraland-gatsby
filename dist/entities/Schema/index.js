"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ajv_1 = __importDefault(require("ajv"));
var isEmail_1 = __importDefault(require("validator/lib/isEmail"));
var isUUID_1 = __importDefault(require("validator/lib/isUUID"));
var isURL_1 = __importDefault(require("validator/lib/isURL"));
var isNumeric_1 = __importDefault(require("validator/lib/isNumeric"));
var isEthereumAddress_1 = __importDefault(require("validator/lib/isEthereumAddress"));
exports.default = new ajv_1.default()
    .addFormat('address', isEthereumAddress_1.default)
    .addFormat('email', isEmail_1.default)
    .addFormat('uuid', isUUID_1.default)
    .addFormat('numeric', function (n) { return isNumeric_1.default(n); })
    .addFormat('domain', function (domain) {
    return new RegExp('^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$').test(domain);
})
    .addFormat('url', function (url) {
    return isURL_1.default(url, {
        protocols: ['http', 'https'],
        require_tld: true,
        require_protocol: true,
        require_host: true,
        require_valid_protocol: true,
        allow_underscores: false,
        allow_trailing_dot: false,
        allow_protocol_relative_urls: false,
        disallow_auth: true,
    });
});
