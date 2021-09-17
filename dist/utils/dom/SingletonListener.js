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
var immutable_1 = require("immutable");
var rollbar_1 = __importDefault(require("../development/rollbar"));
var segment_1 = __importDefault(require("../development/segment"));
/**
 * SingletonListener
 *
 * An event handler manager to minimize the number of subscription to DOM objects
 */
var SingletonListener = /** @class */ (function () {
    function SingletonListener(target) {
        if (target === void 0) { target = null; }
        this.target = null;
        this.listeners = new Map();
        this.callbacks = new Map();
        this.target = target;
    }
    /**
     * Check for previous instance to return, otherwise create new one
     *
     * @param target listener target
     */
    SingletonListener.from = function (target) {
        var id = immutable_1.hash(target);
        if (!this.cache.has(id)) {
            this.cache.set(id, new SingletonListener(target));
        }
        return this.cache.get(id);
    };
    Object.defineProperty(SingletonListener.prototype, "size", {
        /**
         * return the total of subscription to this listener
         */
        get: function () {
            var e_1, _a;
            var result = 0;
            try {
                for (var _b = __values(this.listeners.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var listeners = _c.value;
                    result += listeners.length;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return result;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Create a physical subscription to a target event
     * @param event
     */
    SingletonListener.prototype.subscribe = function (event) {
        if (this.callbacks.has(event)) {
            console.warn("Already subscribed to \"" + event + "\"");
            return this;
        }
        var _this = this;
        var callback = function (data) {
            var e_2, _a;
            var listeners = _this.listeners.get(event) || [];
            try {
                for (var listeners_1 = __values(listeners), listeners_1_1 = listeners_1.next(); !listeners_1_1.done; listeners_1_1 = listeners_1.next()) {
                    var listener = listeners_1_1.value;
                    try {
                        listener.call(this, data);
                    }
                    catch (err) {
                        console.error("Error executing listener: " + err.message, err);
                        rollbar_1.default(function (rollbar) {
                            return rollbar.error("Error executing listener: " + err.message, err);
                        });
                        segment_1.default(function (analytics) {
                            return analytics.track('error', __assign(__assign({}, err), { message: "Error executing listener: " + err.message, stack: err.stack }));
                        });
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (listeners_1_1 && !listeners_1_1.done && (_a = listeners_1.return)) _a.call(listeners_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        if (this.target) {
            this.target.addEventListener(event, callback);
        }
        this.callbacks.set(event, callback);
        return this;
    };
    /**
     * Remove a virtual subscription to a target event
     * if there aren't any more virtual subscription then
     * will remove the physical subscription
     *
     * @param event
     */
    SingletonListener.prototype.unsubscribe = function (event) {
        var listeners = this.listeners.get(event);
        if (listeners && listeners.length) {
            this.listeners.set(event, []);
        }
        var callback = this.callbacks.get(event);
        if (callback) {
            this.callbacks.delete(event);
            if (this.target) {
                this.target.removeEventListener(event, callback);
            }
        }
        return this;
    };
    /**
     * Dispatch and event to all virtual subscriptions
     * @param event
     * @param data
     */
    SingletonListener.prototype.dispatch = function (event, data) {
        var target = this.target;
        var callback = this.callbacks.get(event);
        return Promise.resolve().then(function () {
            if (callback) {
                callback.call(target, data);
            }
        });
    };
    /**
     * Create a virtual subscription to the target
     *
     * @param event
     * @param listener
     */
    SingletonListener.prototype.addEventListener = function (event, listener) {
        var listeners = this.listeners.get(event) || [];
        listeners.push(listener);
        if (listeners.length === 1) {
            this.subscribe(event);
        }
        this.listeners.set(event, listeners);
        return this;
    };
    /**
     * Remove a virtual subscription to the target
     * @param event
     * @param listener
     */
    SingletonListener.prototype.removeEventListener = function (event, listener) {
        var listeners = this.listeners.get(event);
        if (!listeners || listeners.length === 0) {
            return this.unsubscribe(event);
        }
        var newListeners = listeners.filter(function (l) { return l !== listener; });
        if (newListeners.length === 0) {
            return this.unsubscribe(event);
        }
        this.listeners.set(event, newListeners);
        return this;
    };
    /**
     * instance store
     */
    SingletonListener.cache = new Map();
    return SingletonListener;
}());
exports.default = SingletonListener;
