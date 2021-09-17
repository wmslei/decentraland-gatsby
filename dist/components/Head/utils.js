"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDescription = exports.extension = void 0;
/**
 * Extract the extension from a file path
 *
 * @example `assert.equal(extension("./file.html"), "html")`
 * @example `assert.equal(extension("./file.html?query"), "html")`
 * @example `assert.equal(extension("./file.min.js?query"), "js")`
 */
function extension(file) {
    var questionMarkPosition = file.indexOf('?');
    if (questionMarkPosition >= 0) {
        file = file.slice(0, questionMarkPosition);
    }
    var dotPosition = file.lastIndexOf('.');
    if (dotPosition >= 0) {
        return file.slice(dotPosition + 1);
    }
    return null;
}
exports.extension = extension;
function formatDescription(value) {
    value = (value || '').trim();
    var position = value.indexOf("\n\n");
    if (position > 0) {
        value = value.slice(0, position).trim();
    }
    return value;
}
exports.formatDescription = formatDescription;
