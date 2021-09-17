"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentIdentity = exports.setCurrentIdentity = exports.isValid = exports.isExpired = void 0;
var types_1 = require("dcl-crypto/dist/types");
var SingletonListener_1 = __importDefault(require("../dom/SingletonListener"));
var Time_1 = __importDefault(require("../date/Time"));
var types_2 = require("../loader/types");
var STORE_LEGACY_KEY = 'auth';
var CURRENT_IDENTITY = null;
var CURRENT_IDENTITY_RAW = null;
var STORAGE_LISTENER = null;
function getStorateListener() {
    if (STORAGE_LISTENER === null) {
        CURRENT_IDENTITY = restoreIdentity();
        STORAGE_LISTENER = SingletonListener_1.default.from(window);
        // TODO: fix inter operativity with formatic
        // STORAGE_LISTENER.addEventListener('storage', (event) => {
        //   if (event.key !== PersistedKeys.Identity) {
        //     return
        //   }
        //   CURRENT_IDENTITY = restoreIdentity()
        //   // domain propagation
        //   Promise.resolve().then(() => {
        //     getStorateListener().dispatch(PersistedKeys.Identity as any, CURRENT_IDENTITY)
        //   })
        // })
    }
    return STORAGE_LISTENER;
}
function isExpired(identity) {
    if (!identity) {
        return true;
    }
    return Time_1.default.date(identity.expiration).getTime() < Date.now();
}
exports.isExpired = isExpired;
function isValid(identity) {
    if (!identity) {
        return false;
    }
    var link = identity.authChain.find(function (link) {
        return link.type === types_1.AuthLinkType.ECDSA_PERSONAL_EPHEMERAL ||
            link.type === types_1.AuthLinkType.ECDSA_EIP_1654_EPHEMERAL;
    });
    if (link && link.signature && typeof link.signature === 'string') {
        return true;
    }
    return false;
}
exports.isValid = isValid;
function setCurrentIdentity(identity) {
    if (identity === null || isExpired(identity) || !isValid(identity)) {
        CURRENT_IDENTITY = null;
        storeIdentity(null);
        return null;
    }
    CURRENT_IDENTITY = identity;
    storeIdentity(identity);
    return identity;
}
exports.setCurrentIdentity = setCurrentIdentity;
function getCurrentIdentity() {
    getStorateListener();
    return CURRENT_IDENTITY;
}
exports.getCurrentIdentity = getCurrentIdentity;
function storeIdentity(identity) {
    localStorage.removeItem(STORE_LEGACY_KEY);
    if (identity === null) {
        CURRENT_IDENTITY_RAW = null;
        localStorage.removeItem(types_2.PersistedKeys.Identity);
    }
    else {
        CURRENT_IDENTITY_RAW = JSON.stringify(identity);
        localStorage.setItem(types_2.PersistedKeys.Identity, CURRENT_IDENTITY_RAW);
    }
    // local propagation
    Promise.resolve().then(function () {
        getStorateListener().dispatch(types_2.PersistedKeys.Identity, identity);
    });
}
function restoreIdentity() {
    var raw = localStorage.getItem(types_2.PersistedKeys.Identity);
    if (!raw || raw === 'null') {
        CURRENT_IDENTITY_RAW = null;
        return null;
    }
    if (CURRENT_IDENTITY_RAW === raw) {
        return CURRENT_IDENTITY;
    }
    try {
        var identity = JSON.parse(raw);
        if (identity && (isExpired(identity) || !isValid(identity))) {
            localStorage.removeItem(types_2.PersistedKeys.Identity);
            CURRENT_IDENTITY_RAW = null;
            return null;
        }
        CURRENT_IDENTITY_RAW = raw;
        return identity;
    }
    catch (err) {
        CURRENT_IDENTITY_RAW = null;
        return null;
    }
}
