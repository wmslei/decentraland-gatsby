"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function rollbar(tracker) {
    if (typeof window !== 'undefined') {
        if (window.Rollbar) {
            tracker(window.Rollbar);
        }
    }
}
exports.default = rollbar;
