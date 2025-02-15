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
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var decentraland_server_1 = require("decentraland-server");
var isUUID_1 = __importDefault(require("validator/lib/isUUID"));
var Job = /** @class */ (function (_super) {
    __extends(Job, _super);
    function Job() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Job.build = function (job) {
        return __assign(__assign({}, job), { payload: JSON.parse(job.payload || '{}'), run_at: new Date(job.run_at.toString()), created_at: new Date(job.created_at.toString()) });
    };
    Job.getPending = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, jobs, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = decentraland_server_1.SQL(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT * FROM ", " WHERE run_at <= ", ""], ["SELECT * FROM ",
                            " WHERE run_at <= ", ""])), decentraland_server_1.raw(Job.tableName), new Date());
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.query(query)];
                    case 2:
                        jobs = _a.sent();
                        return [2 /*return*/, jobs.map(function (job) { return _this.build(job); })];
                    case 3:
                        err_1 = _a.sent();
                        throw Object.assign(new Error(err_1.message), { query: query.text });
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Job.updatePayload = function (id, payload) {
        if (payload === void 0) { payload = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var query, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id) {
                            return [2 /*return*/];
                        }
                        query = decentraland_server_1.SQL(templateObject_2 || (templateObject_2 = __makeTemplateObject(["UPDATE ", " SET payload = ", " WHERE id = ", ""], ["UPDATE ",
                            " SET payload = ", " WHERE id = ", ""])), decentraland_server_1.raw(Job.tableName), JSON.stringify(payload), id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Job.query(query)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        err_2 = _a.sent();
                        throw Object.assign(new Error(err_2.message), { query: query.text });
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Job.schedule = function (id, name, date, payload) {
        if (payload === void 0) { payload = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var job, query, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        job = {
                            id: id,
                            name: name,
                            payload: payload,
                            run_at: date,
                            created_at: new Date(),
                        };
                        query = decentraland_server_1.SQL(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      INSERT\n        INTO ", " (id, name, payload, run_at, created_at)\n        VALUES (", ", ", ", ", ", ", ", ", ")\n    "], ["\n      INSERT\n        INTO ", " (id, name, payload, run_at, created_at)\n        VALUES (", ", ", ", ", ", ",
                            ", ", ")\n    "])), decentraland_server_1.raw(Job.tableName), job.id, job.name, JSON.stringify(job.payload), job.run_at, job.created_at);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Job.query(query)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, job];
                    case 3:
                        err_3 = _a.sent();
                        throw Object.assign(new Error(err_3.message), { query: query.text });
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Job.complete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!isUUID_1.default(id)) {
                    return [2 /*return*/, false];
                }
                return [2 /*return*/, this.delete({ id: id })];
            });
        });
    };
    Job.tableName = 'jobs';
    return Job;
}(decentraland_server_1.Model));
exports.default = Job;
var templateObject_1, templateObject_2, templateObject_3;
