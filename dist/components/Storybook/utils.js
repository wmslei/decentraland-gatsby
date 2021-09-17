"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Args = void 0;
var Types = {
    Int: {
        summary: 'int',
        detail: 'non floating number (example: `2`, `1`, `0`, `-1`, `-2`)',
    },
    Uint: {
        summary: 'uint',
        detail: 'non floating positive number (example: `2`, `1`, `0`)',
    },
    Hex: {
        summary: 'hex',
        detail: 'string contianing only hexadecimal character (example: `0123456789abcdef`)',
    },
};
exports.Args = {
    Types: Types,
    type: function (summary, detail) { return ({ summary: summary, detail: detail }); },
    definedTypes: function (summary, types) {
        return this.type(summary, types.map(String).join('\n'));
    },
    prop: function (name, description, type) {
        return {
            name: name,
            description: description,
            table: {
                type: typeof type === 'string' ? exports.Args.type(type) : type,
            },
        };
    },
    requiredProp: function (name, description, type) {
        return {
            name: name,
            description: description,
            type: { required: true },
            table: {
                type: typeof type === 'string' ? exports.Args.type(type) : type,
            },
        };
    },
    param: function (name, description, type) {
        return {
            name: name,
            description: description,
            table: {
                type: typeof type === 'string' ? exports.Args.type(type) : type,
                category: 'params',
            },
        };
    },
    requiredParam: function (name, description, type) {
        return {
            name: name,
            description: description,
            type: { required: true },
            table: {
                type: typeof type === 'string' ? exports.Args.type(type) : type,
                category: 'params',
            },
        };
    },
    returns: function (name, description, type) {
        return {
            name: name,
            description: description,
            table: {
                type: typeof type === 'string' ? exports.Args.type(type) : type,
                category: 'returns',
            },
        };
    },
};
