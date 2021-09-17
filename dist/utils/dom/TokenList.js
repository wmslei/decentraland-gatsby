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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a set of space-separated tokens. It is indexed
 * beginning with 0 as with JavaScript Array objects. TokenList
 * is always case-sensitive.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList
 */
var TokenList = /** @class */ (function () {
    function TokenList(initialValue) {
        this.tokens = [];
        if (initialValue) {
            this.add(initialValue);
        }
    }
    TokenList.join = function (tokens) {
        var _a;
        return (_a = new TokenList()).add.apply(_a, __spread(tokens)).value;
    };
    Object.defineProperty(TokenList.prototype, "length", {
        get: function () {
            return this.tokens.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TokenList.prototype, "value", {
        get: function () {
            return Array.from(this.tokens.values()).join(' ');
        },
        enumerable: false,
        configurable: true
    });
    TokenList.prototype.item = function (index) {
        return this.tokens[index];
    };
    TokenList.prototype.contains = function (token) {
        var _this = this;
        if (!token) {
            return false;
        }
        return token.split(/\s+/).every(function (current) { return _this.tokens.includes(current); });
    };
    TokenList.prototype.add = function () {
        var e_1, _a, e_2, _b;
        var tokens = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tokens[_i] = arguments[_i];
        }
        try {
            for (var tokens_1 = __values(tokens), tokens_1_1 = tokens_1.next(); !tokens_1_1.done; tokens_1_1 = tokens_1.next()) {
                var token = tokens_1_1.value;
                if (typeof token === 'string') {
                    try {
                        for (var _c = (e_2 = void 0, __values(token.split(/\s+/))), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var each = _d.value;
                            if (Boolean(each) && !this.contains(each)) {
                                this.tokens.push(each);
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (tokens_1_1 && !tokens_1_1.done && (_a = tokens_1.return)) _a.call(tokens_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return this;
    };
    TokenList.prototype.remove = function () {
        var e_3, _a, e_4, _b;
        var tokens = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tokens[_i] = arguments[_i];
        }
        try {
            for (var tokens_2 = __values(tokens), tokens_2_1 = tokens_2.next(); !tokens_2_1.done; tokens_2_1 = tokens_2.next()) {
                var token = tokens_2_1.value;
                if (typeof token === 'string') {
                    var _loop_1 = function (each) {
                        if (Boolean(each)) {
                            this_1.tokens = this_1.tokens.filter(function (current) { return current !== each; });
                        }
                    };
                    var this_1 = this;
                    try {
                        for (var _c = (e_4 = void 0, __values(token.split(' '))), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var each = _d.value;
                            _loop_1(each);
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (tokens_2_1 && !tokens_2_1.done && (_a = tokens_2.return)) _a.call(tokens_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return this;
    };
    TokenList.prototype.replace = function (oldToken, newToken) {
        var e_5, _a;
        if (!oldToken || !newToken) {
            return this;
        }
        if (/s+/.test(newToken)) {
            return this;
        }
        var oldExists = this.tokens.includes(oldToken);
        var newExists = this.tokens.includes(newToken);
        var duplicated = oldExists && newExists;
        var newTokens = [];
        try {
            for (var _b = __values(this.tokens), _c = _b.next(); !_c.done; _c = _b.next()) {
                var current = _c.value;
                if (duplicated && current === newToken) {
                    // ignore
                }
                else if (current === oldToken) {
                    newTokens.push(newToken);
                }
                else {
                    newTokens.push(current);
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
        this.tokens = newTokens;
        return this;
    };
    TokenList.prototype.toggle = function (token, force) {
        if (!token) {
            return this;
        }
        if (/s+/.test(token)) {
            return this;
        }
        switch (force) {
            case true:
                this.add(token);
                return this;
            case false:
                this.remove(token);
                return this;
            default:
            // ignore
        }
        var newTokens = this.tokens.filter(function (current) { return current !== token; });
        // token was removed
        if (newTokens.length !== this.tokens.length) {
            this.tokens = newTokens;
        }
        else {
            this.tokens.push(token);
        }
        return this;
    };
    TokenList.prototype.entries = function () {
        return this.tokens.entries();
    };
    TokenList.prototype.forEach = function (callback, thisArg) {
        return this.tokens.forEach(callback, thisArg);
    };
    TokenList.prototype.keys = function () {
        return this.tokens.keys();
    };
    TokenList.prototype.values = function () {
        return this.tokens.values();
    };
    TokenList.prototype[Symbol.iterator] = function () {
        return this.values();
    };
    return TokenList;
}());
exports.default = TokenList;
