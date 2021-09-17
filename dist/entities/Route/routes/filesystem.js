"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var glob_1 = __importDefault(require("glob"));
var express_1 = require("express");
var path_1 = require("path");
var redirect_1 = __importDefault(require("./redirect"));
var file_1 = __importDefault(require("./file"));
function filesystemOptions(value) {
    var options = typeof value === 'string' ? { notFoundFile: value } : value;
    return __assign({ indexFile: 'index.html', notFoundFile: '404.html' }, options);
}
function filesystem(path, notFoundPage) {
    var e_1, _a;
    var router = express_1.Router();
    var options = filesystemOptions(notFoundPage);
    var indexFile = '/' + options.indexFile;
    var cwd = path_1.resolve(process.cwd(), path);
    var files = Array.from(new Set(glob_1.default.sync('**/*', { cwd: cwd, nodir: true })).values()).sort();
    try {
        for (var files_1 = __values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
            var filePath = files_1_1.value;
            var webPath = '/' + filePath; // => /en/index.html
            if (webPath.endsWith(indexFile)) {
                var basePath = webPath.slice(0, -10);
                router.get(webPath, redirect_1.default(basePath)); // redirect /en/index.html => /en/
                router.get(basePath, file_1.default(path_1.resolve(cwd, filePath))); // load /en/index.html on /en/
            }
            else {
                router.get(webPath, file_1.default(path_1.resolve(cwd, filePath))); // load /en/other.html
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    router.use(file_1.default(path_1.resolve(cwd, options.notFoundFile), 404));
    return router;
}
exports.default = filesystem;
