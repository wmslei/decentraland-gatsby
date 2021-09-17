"use strict";
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
var segment_1 = __importDefault(require("./segment"));
function trackEvent(handle) {
    return function (event) {
        var extra = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            extra[_i - 1] = arguments[_i];
        }
        segment_1.default(function (analytics) {
            var type = event.type;
            var element = event.currentTarget;
            var text = element.innerText.trim() || element.title.trim();
            var name = element.name || null;
            var value = element.value || null;
            var href = element.href || null;
            analytics.track(type, {
                text: text,
                name: name,
                value: value,
                href: href,
                location: location.toString(),
            });
        });
        handle && handle.apply(void 0, __spread([event], extra));
    };
}
exports.default = trackEvent;
