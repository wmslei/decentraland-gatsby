"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = exports.QUERY_HASHES = void 0;
var crypto_1 = require("crypto");
var decentraland_server_1 = require("decentraland-server");
var metrics_1 = require("./metrics");
exports.QUERY_HASHES = new Map();
function hash(query) {
    var hash = crypto_1.createHash('sha1').update(query.text).digest('hex');
    if (!exports.QUERY_HASHES.has(hash)) {
        exports.QUERY_HASHES.set(hash, query.text);
    }
    return hash;
}
var Model = /** @class */ (function (_super) {
    __extends(Model, _super);
    function Model() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Model.find = function (conditions, orderBy, extra) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            var _this = this;
            return __generator(this, function (_a) {
                params = {
                    table: this.tableName,
                    method: 'find',
                };
                if (conditions) {
                    params.conditions = Object.keys(conditions).sort().join(',');
                }
                if (orderBy) {
                    params.orderBy = Object.keys(orderBy).sort().join(',');
                }
                return [2 /*return*/, metrics_1.withDatabaseMetrics(function () { return _super.find.call(_this, conditions, orderBy, extra); }, params)];
            });
        });
    };
    Model.findOne = function (conditions, orderBy) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            var _this = this;
            return __generator(this, function (_a) {
                params = {
                    table: this.tableName,
                    method: 'findOne',
                };
                if (conditions) {
                    params.conditions = Object.keys(conditions).sort().join(',');
                }
                if (orderBy) {
                    params.orderBy = Object.keys(orderBy).sort().join(',');
                }
                return [2 /*return*/, metrics_1.withDatabaseMetrics(function () { return _super.findOne.call(_this, conditions, orderBy); }, params)];
            });
        });
    };
    Model.count = function (conditions, extra) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            var _this = this;
            return __generator(this, function (_a) {
                params = {
                    table: this.tableName,
                    method: 'count',
                };
                if (conditions) {
                    params.conditions = Object.keys(conditions).sort().join(',');
                }
                return [2 /*return*/, metrics_1.withDatabaseMetrics(function () { return _super.count.call(_this, conditions, extra); }, params)];
            });
        });
    };
    Model.create = function (row) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, metrics_1.withDatabaseMetrics(function () { return _super.create.call(_this, row); }, {
                        table: this.tableName,
                        method: 'create',
                        rows: Object.keys(row).sort().join(','),
                    })];
            });
        });
    };
    Model.upsert = function (row, onConflict) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, metrics_1.withDatabaseMetrics(function () { return _super.upsert.call(_this, row, onConflict); }, {
                        table: this.tableName,
                        method: 'upsert',
                        rows: Object.keys(row).sort().join(','),
                    })];
            });
        });
    };
    Model.update = function (changes, conditions) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            var _this = this;
            return __generator(this, function (_a) {
                params = {
                    table: this.tableName,
                    method: 'update',
                };
                if (changes) {
                    params.updates = Object.keys(changes).sort().join(',');
                }
                if (conditions) {
                    params.conditions = Object.keys(conditions).sort().join(',');
                }
                return [2 /*return*/, metrics_1.withDatabaseMetrics(function () { return _super.update.call(_this, changes, conditions); }, params)];
            });
        });
    };
    Model.delete = function (conditions) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, metrics_1.withDatabaseMetrics(function () { return _super.delete.call(_this, conditions); }, {
                        table: this.tableName,
                        method: 'delete',
                        conditions: Object.keys(conditions).sort().join(','),
                    })];
            });
        });
    };
    Model.query = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, metrics_1.withDatabaseMetrics(function () { return _super.query.call(_this, query.text, query.values); }, {
                        table: this.tableName,
                        method: 'query',
                        hash: hash(query),
                    })];
            });
        });
    };
    /**
     * Execute a query and returns the number of row affected
     */
    Model.rowCount = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, metrics_1.withDatabaseMetrics(function () { return __awaiter(_this, void 0, void 0, function () {
                        var result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.db.client.query(query)];
                                case 1:
                                    result = _a.sent();
                                    return [2 /*return*/, result.rowCount];
                            }
                        });
                    }); }, {
                        table: this.tableName,
                        method: 'rowCount',
                        hash: hash(query),
                    })];
            });
        });
    };
    return Model;
}(decentraland_server_1.Model));
exports.Model = Model;
