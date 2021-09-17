"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var immutable_1 = require("immutable");
var react_1 = require("react");
var globalMemo = new Map();
function useGlobalMemo(callback, deps) {
    return react_1.useMemo(function () {
        var id = deps.map(function (dep) { return immutable_1.hash(dep); }).join('::');
        if (!globalMemo.has(id)) {
            globalMemo.set(id, callback());
        }
        return globalMemo.get(id);
    }, deps);
}
exports.default = useGlobalMemo;
