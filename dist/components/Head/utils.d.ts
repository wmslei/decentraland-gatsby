/**
 * Extract the extension from a file path
 *
 * @example `assert.equal(extension("./file.html"), "html")`
 * @example `assert.equal(extension("./file.html?query"), "html")`
 * @example `assert.equal(extension("./file.min.js?query"), "js")`
 */
export declare function extension(file: string): string | null;
export declare function formatDescription(value: string): string;
