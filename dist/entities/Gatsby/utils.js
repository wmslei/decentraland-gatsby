"use strict";
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceHelmetMetadata = void 0;
var html_escaper_1 = __importDefault(require("html-escaper"));
var node_html_parser_1 = require("node-html-parser");
function escape(text) {
    return html_escaper_1.default.escape(text).replace(/\n+/gi, ' ');
}
function replaceHelmetMetadata(page, options) {
    var e_1, _a, e_2, _b;
    var _c, _d;
    if (options === void 0) { options = {}; }
    var html = node_html_parser_1.parse(page);
    var head = html.querySelector('head');
    head.removeChild(head.querySelector('title'));
    var helmetMetadata = head
        .querySelectorAll('meta')
        .filter(function (meta) { return meta.hasAttribute('data-react-helmet'); });
    try {
        for (var helmetMetadata_1 = __values(helmetMetadata), helmetMetadata_1_1 = helmetMetadata_1.next(); !helmetMetadata_1_1.done; helmetMetadata_1_1 = helmetMetadata_1.next()) {
            var meta = helmetMetadata_1_1.value;
            head.removeChild(meta);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (helmetMetadata_1_1 && !helmetMetadata_1_1.done && (_a = helmetMetadata_1.return)) _a.call(helmetMetadata_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var injected = [];
    try {
        for (var _e = __values(Object.keys(options)), _f = _e.next(); !_f.done; _f = _e.next()) {
            var name_1 = _f.value;
            switch (name_1) {
                case 'title':
                    var title = escape(options[name_1] || '');
                    injected.push("<title>" + title + "</title>");
                    injected.push("<meta name=\"twitter:title\" content=\"" + title + "\" />");
                    injected.push("<meta property=\"og:title\" content=\"" + title + "\" />");
                    break;
                case "description":
                    var descriptionValue = (options[name_1] || '').trim();
                    var descriptionParragraphPosition = descriptionValue.indexOf("\n\n");
                    if (descriptionParragraphPosition > 0) {
                        descriptionValue = descriptionValue
                            .slice(0, descriptionParragraphPosition)
                            .trim();
                    }
                    var description = escape(descriptionValue);
                    injected.push("<meta name=\"description\" content=\"" + description + "\" />");
                    injected.push("<meta name=\"twitter:description\" content=\"" + description + "\" />");
                    injected.push("<meta property=\"og:description\" content=\"" + description + "\" />");
                    break;
                case "image":
                    injected.push("<meta name=\"twitter:image\" content=\"" + options[name_1] + "\" />");
                    injected.push("<meta property=\"og:image\" content=\"" + options[name_1] + "\" />");
                    break;
                case "url":
                    injected.push("<meta name=\"twitter:url\" content=\"" + options[name_1] + "\" />");
                    injected.push("<meta property=\"og:url\" content=\"" + options[name_1] + "\" />");
                    break;
                default:
                    if (name_1.startsWith('og:')) {
                        injected.push("<meta property=\"" + name_1 + "\" content=\"" + escape(String((_c = options[name_1]) !== null && _c !== void 0 ? _c : '')) + "\" />");
                    }
                    else {
                        injected.push("<meta name=\"" + name_1 + "\" content=\"" + escape(String((_d = options[name_1]) !== null && _d !== void 0 ? _d : '')) + "\" />");
                    }
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
        }
        finally { if (e_2) throw e_2.error; }
    }
    var metaNodes = node_html_parser_1.parse(injected.join('')).childNodes.map(function (meta) {
        meta.setAttribute('data-react-helmet', 'true');
        return meta;
    });
    head.childNodes = __spread(metaNodes, head.childNodes);
    return html.toString();
}
exports.replaceHelmetMetadata = replaceHelmetMetadata;
