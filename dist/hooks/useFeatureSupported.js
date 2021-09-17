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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useShareSupported = exports.useServiceWorkerSupported = exports.usePushManagerSupported = exports.useNotificationSupported = exports.useFileSystemSupported = exports.useFileSupported = exports.useCryptoSupported = void 0;
var react_1 = require("react");
var features = {
    Crypto: function () { return 'crypto' in window; },
    File: function () {
        return 'File' in window && 'FileList' in window && 'FileReader' in window;
    },
    FileSystem: function () { return 'requestFileSystem' in window; },
    Notification: function () { return 'Notification' in window && 'permission' in Notification; },
    PushManager: function () { return 'PushManager' in window; },
    ServiceWorker: function () { return 'serviceWorker' in navigator; },
    Share: function () { return 'share' in navigator; },
};
var cache = new Map();
function useFeatureSupported(feature) {
    var _a = __read(react_1.useState(cache.get(feature) || false), 2), isSupported = _a[0], setSupported = _a[1];
    react_1.useEffect(function () {
        if (!cache.has(feature) && features[feature]) {
            cache.set(feature, features[feature]());
        }
        if (isSupported !== cache.get(feature)) {
            setSupported(isSupported);
        }
    }, []);
    return isSupported;
}
exports.default = useFeatureSupported;
function useCryptoSupported() {
    return useFeatureSupported('Crypto');
}
exports.useCryptoSupported = useCryptoSupported;
function useFileSupported() {
    return useFeatureSupported('File');
}
exports.useFileSupported = useFileSupported;
function useFileSystemSupported() {
    return useFeatureSupported('FileSystem');
}
exports.useFileSystemSupported = useFileSystemSupported;
function useNotificationSupported() {
    return useFeatureSupported('Notification');
}
exports.useNotificationSupported = useNotificationSupported;
function usePushManagerSupported() {
    return useFeatureSupported('PushManager');
}
exports.usePushManagerSupported = usePushManagerSupported;
function useServiceWorkerSupported() {
    return useFeatureSupported('ServiceWorker');
}
exports.useServiceWorkerSupported = useServiceWorkerSupported;
function useShareSupported() {
    return useFeatureSupported('Share');
}
exports.useShareSupported = useShareSupported;
