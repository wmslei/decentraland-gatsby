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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var SingletonListener_1 = __importDefault(require("../utils/dom/SingletonListener"));
function useFileDrop(callback) {
    var _a = __read(react_1.useState(false), 2), dragging = _a[0], setDragging = _a[1];
    react_1.useEffect(function () {
        var canceled = false;
        var listener = SingletonListener_1.default.from(document);
        function onDragStart(event) {
            event.preventDefault();
            setDragging(true);
        }
        function onDragEnd(event) {
            event.preventDefault();
            setDragging(false);
        }
        function onDragOver(event) {
            event.preventDefault();
        }
        function onDrop(event) {
            event.preventDefault();
            if (!canceled) {
                callback(event);
            }
        }
        listener.addEventListener('dragstart', onDragStart);
        listener.addEventListener('dragend', onDragEnd);
        listener.addEventListener('dragover', onDragOver);
        listener.addEventListener('drop', onDrop);
        return function () {
            canceled = true;
            listener.removeEventListener('dragstart', onDragStart);
            listener.removeEventListener('dragend', onDragEnd);
            listener.removeEventListener('dragover', onDragOver);
            listener.removeEventListener('drop', onDrop);
        };
    }, []);
    return dragging;
}
exports.default = useFileDrop;
