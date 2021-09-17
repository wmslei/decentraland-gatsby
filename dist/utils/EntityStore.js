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
var SingletonListener_1 = __importDefault(require("./dom/SingletonListener"));
var EntityStore = /** @class */ (function () {
    function EntityStore(config) {
        if (config === void 0) { config = {}; }
        this.config = {
            identifier: function (entity) { return entity.id; },
            initialState: {},
        };
        this.listener = new SingletonListener_1.default();
        this.state = {
            error: null,
            loading: false,
            data: {},
            lists: {},
        };
        Object.assign(this.config, config);
        Object.assign(this.state, this.config.initialState);
    }
    EntityStore.prototype.addEventListener = function (event, callback) {
        this.listener.addEventListener(event, callback);
    };
    EntityStore.prototype.removeEventListener = function (event, callback) {
        this.listener.removeEventListener(event, callback);
    };
    EntityStore.prototype.getState = function () {
        return this.state;
    };
    EntityStore.prototype.getEntity = function (id) {
        return this.state.data[id] || null;
    };
    EntityStore.prototype.getList = function (listName) {
        var _this = this;
        if (listName === void 0) { listName = 'default'; }
        if (this.state.lists[listName]) {
            var list = this.state.lists[listName];
            return list.map(function (id) { return _this.state.data[id]; });
        }
        return null;
    };
    EntityStore.prototype.setEntity = function (entity) {
        var _a;
        var id = this.config.identifier(entity);
        this.state = __assign(__assign({}, this.state), { data: __assign(__assign({}, this.state.data), (_a = {}, _a[id] = entity, _a)) });
        this.listener.dispatch('change', this.state);
    };
    EntityStore.prototype.setEntities = function (entities, listName) {
        var e_1, _a, _b;
        if (listName === void 0) { listName = 'default'; }
        var data = {};
        var list = [];
        try {
            for (var entities_1 = __values(entities), entities_1_1 = entities_1.next(); !entities_1_1.done; entities_1_1 = entities_1.next()) {
                var entity = entities_1_1.value;
                var id = this.config.identifier(entity);
                data[id] = entity;
                list.push(id);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (entities_1_1 && !entities_1_1.done && (_a = entities_1.return)) _a.call(entities_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.state = __assign(__assign({}, this.state), { data: __assign(__assign({}, this.state.data), data), lists: __assign(__assign({}, this.state.lists), (_b = {}, _b[listName] = list, _b)) });
        this.listener.dispatch('change', this.state);
    };
    EntityStore.prototype.setError = function (error) {
        this.state = __assign(__assign({}, this.state), { error: error.message });
        this.listener.dispatch('change', this.state);
    };
    EntityStore.prototype.setLoading = function (value) {
        if (value === void 0) { value = true; }
        if (this.state.loading !== value) {
            this.state = __assign(__assign({}, this.state), { loading: value });
            this.listener.dispatch('change', this.state);
        }
        return value;
    };
    EntityStore.prototype.isLoading = function () {
        return !!this.state.loading;
    };
    EntityStore.prototype.clearList = function (listName) {
        var _a;
        if (listName === void 0) { listName = 'default'; }
        var lists = listName
            ? __assign(__assign({}, this.state.lists), (_a = {}, _a[listName] = null, _a)) : this.state.lists;
        this.state = __assign(__assign({}, this.state), { lists: lists });
        this.listener.dispatch('change', this.state);
    };
    EntityStore.prototype.clear = function () {
        this.state = __assign(__assign({}, this.state), { error: null, data: {}, lists: {} });
        this.listener.dispatch('change', this.state);
    };
    return EntityStore;
}());
exports.default = EntityStore;
