"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var TokenList_1 = __importDefault(require("./TokenList"));
describe('TokenList', function () {
    test('#join', function () {
        expect(TokenList_1.default.join([])).toEqual('');
        expect(TokenList_1.default.join(['token1'])).toEqual('token1');
        expect(TokenList_1.default.join([
            'token1',
            null,
            undefined,
            false,
            false && 'token2',
            true && 'token3',
        ])).toEqual('token1 token3');
    });
    test('constructor', function () {
        expect(new TokenList_1.default().value).toEqual('');
        expect(new TokenList_1.default('token1 token2').value).toEqual('token1 token2');
    });
    test('item', function () {
        var list = new TokenList_1.default('token1 token2');
        expect(list.item(0)).toEqual('token1');
        expect(list.item(1)).toEqual('token2');
        expect(list.item(2)).toEqual(undefined);
    });
    test('contains', function () {
        var list = new TokenList_1.default('token1 token2');
        expect(list.contains('')).toEqual(false);
        expect(list.contains('token1')).toEqual(true);
        expect(list.contains('token2')).toEqual(true);
        expect(list.contains('token3')).toEqual(false);
        expect(list.contains('token1 token2')).toEqual(true);
        expect(list.contains('token2 token1')).toEqual(true);
        expect(list.contains('token2 token1 token3')).toEqual(false);
    });
    test('add', function () {
        expect(new TokenList_1.default('token1').add('token2').value).toEqual('token1 token2');
        expect(new TokenList_1.default('token1')
            .add('token1 token2', 'token3')
            .add('token2 token4').value).toEqual('token1 token2 token3 token4');
    });
    test('remove', function () {
        expect(new TokenList_1.default('token1').remove('token2').value).toEqual('token1');
        expect(new TokenList_1.default('token1 token2').remove('token2').value).toEqual('token1');
        expect(new TokenList_1.default('token1 token2 token3').remove('token2').value).toEqual('token1 token3');
    });
    test('replace', function () {
        var tokens = new TokenList_1.default('token1');
        expect(tokens.replace('token2', 'token3').value).toEqual('token1');
        expect(tokens.value).toEqual('token1');
        expect(tokens.add('token2').value).toEqual('token1 token2');
        expect(tokens.replace('token2', 'token3').value).toEqual('token1 token3');
        expect(tokens.replace('token4', 'token3').value).toEqual('token1 token3');
        expect(tokens.replace('token1', 'token3').value).toEqual('token3');
    });
    test('toggle', function () {
        var tokens = new TokenList_1.default('token1');
        expect(tokens.toggle('toggle').value).toEqual('token1 toggle');
        expect(tokens.toggle('toggle').value).toEqual('token1');
        expect(tokens.toggle('toggle', true).value).toEqual('token1 toggle');
        expect(tokens.toggle('toggle', true).value).toEqual('token1 toggle');
        expect(tokens.toggle('toggle', false).value).toEqual('token1');
        expect(tokens.toggle('toggle', false).value).toEqual('token1');
    });
    test('entries', function () {
        var tokens = new TokenList_1.default('token1 token2');
        expect(Array.from(tokens.entries())).toEqual([
            [0, 'token1'],
            [1, 'token2'],
        ]);
    });
    test('keys', function () {
        var tokens = new TokenList_1.default('token1 token2');
        expect(Array.from(tokens.keys())).toEqual([0, 1]);
    });
    test('values', function () {
        var tokens = new TokenList_1.default('token1 token2');
        expect(Array.from(tokens.values())).toEqual(['token1', 'token2']);
    });
});
