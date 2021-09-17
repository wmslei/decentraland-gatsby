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
exports.clearTransactions = exports.restoreTransactions = exports.storeTransactions = void 0;
var loader_1 = require("../loader");
var transactions = new Map();
function getKey(address, chainId) {
    return [loader_1.PersistedKeys.Transactions, address, chainId].join('.');
}
function injectTransaction(transaction, transactions) {
    if (transactions === void 0) { transactions = []; }
    if (transactions.length === 0) {
        return [transaction];
    }
    var replaced = false;
    transactions = transactions.map(function (tx) {
        if (tx.hash === transaction.hash) {
            replaced = true;
            return __assign(__assign({}, transaction), { chainId: typeof transaction.chainId === 'string'
                    ? parseInt(transaction.chainId, 16)
                    : transaction.chainId });
        }
        return tx;
    });
    return replaced ? transactions : __spread([transaction], transactions);
}
function storeTransactions(address, chainId, txs) {
    var e_1, _a;
    var key = getKey(address, chainId);
    var memoryTransasctions = transactions.get(key) || [];
    var storageTransactions = JSON.parse(localStorage.getItem(key) || '[]');
    try {
        for (var txs_1 = __values(txs), txs_1_1 = txs_1.next(); !txs_1_1.done; txs_1_1 = txs_1.next()) {
            var tx = txs_1_1.value;
            memoryTransasctions = injectTransaction(tx, memoryTransasctions);
            storageTransactions = injectTransaction(tx, storageTransactions);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (txs_1_1 && !txs_1_1.done && (_a = txs_1.return)) _a.call(txs_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var filteredMemoryTransasctions = memoryTransasctions.filter(function (tx) { return tx.chainId === chainId; });
    if (memoryTransasctions.length !== filteredMemoryTransasctions.length) {
        memoryTransasctions = filteredMemoryTransasctions;
    }
    transactions.set(key, memoryTransasctions);
    localStorage.setItem(key, JSON.stringify(storageTransactions));
    return memoryTransasctions;
}
exports.storeTransactions = storeTransactions;
function restoreTransactions(address, chainId) {
    var key = getKey(address, chainId);
    if (!transactions.has(key)) {
        var storedTransactions = JSON.parse(localStorage.getItem(key) || '[]');
        transactions.set(key, storedTransactions);
    }
    return transactions.get(key).filter(function (tx) { return tx.chainId === chainId; });
}
exports.restoreTransactions = restoreTransactions;
function clearTransactions(address, chainId) {
    var key = getKey(address, chainId);
    transactions.delete(key);
    localStorage.removeItem(key);
}
exports.clearTransactions = clearTransactions;
