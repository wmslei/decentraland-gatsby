"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var validOriginCases = [
    'http://localhost',
    'http://localhost:8080',
    'https://localhost',
    'https://localhost:8080',
    'http://127.0.0.1',
    'http://127.0.0.1:8080',
    'https://127.0.0.1',
    'https://127.0.0.1:8080',
    'http://192.168.0.18',
    'http://192.168.0.18:8080',
    'https://192.168.0.18',
    'https://192.168.0.18:8080',
    'https://dcl.gg',
    'https://subdomain.dcl.gg',
    'https://decentraland.today',
    'https://subdomain.decentraland.today',
    'https://decentraland.zone',
    'https://subdomain.decentraland.zone',
    'https://decentraland.org',
    'https://subdomain.decentraland.org',
    'https://decentraland.io',
    'https://subdomain.decentraland.io',
    'https://now.sh',
    'https://subdomain.now.sh',
    'https://manaland.cn',
    'https://subdomain.manaland.cn',
];
var invalidOriginCases = [
    'http://otherhost',
    'http://otherhost:8080',
    'https://otherhost',
    'https://otherhost:8080',
    'http://127.0.0.2',
    'http://127.0.0.2:8080',
    'https://127.0.0.2',
    'https://127.0.0.2:8080',
    'http://192.167.0.18',
    'http://192.167.0.18:8080',
    'https://192.167.0.18',
    'https://192.167.0.18:8080',
    'http://10.1.2.3',
    'http://10.1.2.3:8080',
    'https://10.1.2.3',
    'https://10.1.2.3:8080',
    'http://dcl.gg',
    'http://subdomain.dcl.gg',
    'http://decentraland.today',
    'http://subdomain.decentraland.today',
    'http://decentraland.zone',
    'http://subdomain.decentraland.zone',
    'http://decentraland.org',
    'http://subdomain.decentraland.org',
    'http://decentraland.io',
    'http://subdomain.decentraland.io',
    'http://now.sh',
    'http://subdomain.now.sh',
    'http://manaland.cn',
    'http://subdomain.manaland.cn',
    'http://other.domain',
    'https://other.domain',
];
describe('defaultOrigin', function () {
    validOriginCases.forEach(function (origin) {
        test("allow " + origin, function () {
            expect(types_1.defaultOrigin.some(function (regex) { return regex.test(origin); })).toBe(true);
        });
    });
    invalidOriginCases.forEach(function (origin) {
        test("deny " + origin, function () {
            expect(types_1.defaultOrigin.every(function (regex) { return !regex.test(origin); })).toBe(true);
        });
    });
});
