"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requiredEnv = void 0;
function env(name, defaultValue) {
    return (process.env[name] ||
        process.env['GATSBY_' + name] ||
        process.env['REACT_APP_' + name] ||
        process.env['STORYBOOK_' + name] ||
        defaultValue);
}
exports.default = env;
function requiredEnv(name) {
    var value = env(name, '');
    if (!value) {
        throw new Error("Missing \"" + name + "\" environment variable. Check your .env.example file");
    }
    return value;
}
exports.requiredEnv = requiredEnv;
