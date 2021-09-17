"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sign_1 = require("./sign");
describe('utils/sign', function () {
    test("sign", function () {
        return expect(sign_1.sign({}, '123456')).toBe('e30=.65X0tumNLI9khJR9B7cM1yZHTKndoWU1n3tlRkBqfkI=');
    });
    test("decode", function () {
        var secret = '123456';
        var data1 = { random: Math.random() };
        var data2 = { random: Math.random() };
        var data3 = { random: Math.random() };
        var sign1 = sign_1.sign(data1, secret);
        var sign2 = sign_1.sign(data2, secret);
        var sign3 = sign_1.sign(data3, secret);
        expect(sign_1.decode(sign1)).toEqual(data1);
        expect(sign_1.decode(sign2)).toEqual(data2);
        expect(sign_1.decode(sign3)).toEqual(data3);
        expect(sign_1.decode('111' + sign1)).toEqual(null);
    });
    test("verify", function () {
        var secret = '123456';
        var data1 = { random: Math.random() };
        var data2 = { random: Math.random() };
        var data3 = { random: Math.random() };
        var sign1 = sign_1.sign(data1, secret);
        var sign2 = sign_1.sign(data2, secret);
        var sign3 = sign_1.sign(data3, secret);
        expect(sign_1.verify(sign1, secret)).toEqual(data1);
        expect(sign_1.verify(sign2, secret)).toEqual(data2);
        expect(sign_1.verify(sign3, secret)).toEqual(data3);
        // invalids
        expect(sign_1.verify(sign3 + 'extra', secret)).toEqual(null);
        expect(sign_1.verify(sign3, '111111')).toEqual(null);
        expect(sign_1.verify('', secret)).toEqual(null);
    });
});
