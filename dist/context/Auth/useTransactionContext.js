"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var AuthProvider_1 = require("./AuthProvider");
function useTransactionContext() {
    return react_1.useContext(AuthProvider_1.TransactionContext);
}
exports.default = useTransactionContext;
