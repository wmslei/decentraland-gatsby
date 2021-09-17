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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
var aws_sdk_1 = require("aws-sdk");
var chunk_1 = __importDefault(require("../../utils/array/chunk"));
var metrics_1 = require("../Prometheus/metrics");
var metrics_2 = require("./metrics");
var utils_1 = require("./utils");
var Sender = /** @class */ (function () {
    function Sender(_a) {
        var path = _a.path, bulk = _a.bulk, source = _a.source, options = __rest(_a, ["path", "bulk", "source"]);
        this.templateLoaded = new Map();
        this.templateContent = new Map();
        this.ses = new aws_sdk_1.SES(options);
        this.source = source || '';
        this.path = path !== null && path !== void 0 ? path : process.cwd();
        this.bulk = bulk !== null && bulk !== void 0 ? bulk : false;
        if (options.region) {
            this.region = options.region;
        }
        // this.source = 'Decentraland Events <hello@decentraland.org>'
        // emailMatch = [ '<hello@decentraland.org>', 'hello@decentraland.org' ]
        var emailMatch = this.source.match(/<(.*)>/i);
        this.email = emailMatch ? emailMatch[1] : this.source;
        metrics_1.registerMetric(metrics_2.aws_ses_sent_total);
    }
    Sender.prototype.inc = function (value) {
        if (value === void 0) { value = 1; }
        metrics_2.aws_ses_sent_total.inc({
            bulk: this.bulk ? 1 : 0,
            region: this.region || 'default',
            email: this.email,
        }, value);
    };
    Sender.prototype.send = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.bulk ? this.sendBulk(options) : this.sendAll(options)];
            });
        });
    };
    Sender.prototype.sendAll = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var results, _loop_1, this_1, _a, _b, destination, e_1_1;
            var e_1, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        results = [];
                        _loop_1 = function (destination) {
                            var _a, email, replacement, Message, params, result;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = this_1.destination(destination), email = _a.email, replacement = _a.replacement;
                                        return [4 /*yield*/, this_1.parseTemplate(options.template, __assign(__assign({}, options.defaultReplacement), replacement))];
                                    case 1:
                                        Message = _b.sent();
                                        params = {
                                            Destination: {
                                                ToAddresses: [email],
                                            },
                                            Message: Message,
                                            Source: this_1.source,
                                        };
                                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                                _this.ses.sendEmail(params, function (err, result) {
                                                    return err ? reject(err) : resolve(result);
                                                });
                                            })];
                                    case 2:
                                        result = _b.sent();
                                        this_1.inc();
                                        results.push(result);
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 8]);
                        _a = __values(options.destinations), _b = _a.next();
                        _d.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 5];
                        destination = _b.value;
                        return [5 /*yield**/, _loop_1(destination)];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, results];
                }
            });
        });
    };
    Sender.prototype.sendBulk = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var results, DefaultTemplateData, batch, _loop_2, this_2, _a, _b, destinations, e_2_1;
            var e_2, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        results = [];
                        DefaultTemplateData = JSON.stringify(options.defaultReplacement || {});
                        return [4 /*yield*/, this.deployTemplate(options.template)];
                    case 1:
                        _d.sent();
                        batch = 50;
                        _loop_2 = function (destinations) {
                            var params, result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        params = {
                                            Destinations: destinations.map(function (destination) {
                                                var _a = _this.destination(destination), email = _a.email, replacement = _a.replacement;
                                                return {
                                                    Destination: { ToAddresses: [email] },
                                                    ReplacementTemplateData: JSON.stringify(replacement),
                                                };
                                            }),
                                            Source: this_2.source,
                                            Template: options.template,
                                            DefaultTemplateData: DefaultTemplateData,
                                        };
                                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                                _this.ses.sendBulkTemplatedEmail(params, function (err, data) {
                                                    return err ? reject(err) : resolve(data);
                                                });
                                            })];
                                    case 1:
                                        result = _a.sent();
                                        this_2.inc(destinations.length);
                                        results.push(result);
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_2 = this;
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 7, 8, 9]);
                        _a = __values(chunk_1.default(options.destinations, batch)), _b = _a.next();
                        _d.label = 3;
                    case 3:
                        if (!!_b.done) return [3 /*break*/, 6];
                        destinations = _b.value;
                        return [5 /*yield**/, _loop_2(destinations)];
                    case 4:
                        _d.sent();
                        _d.label = 5;
                    case 5:
                        _b = _a.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_2_1 = _d.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/, results];
                }
            });
        });
    };
    Sender.prototype.getTemplate = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var template;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.templateContent.has(name)) return [3 /*break*/, 2];
                        return [4 /*yield*/, utils_1.readTemplate(this.path, name)];
                    case 1:
                        template = _a.sent();
                        this.templateContent.set(name, {
                            Subject: { Charset: 'UTF-8', Data: template.SubjectPart },
                            Body: {
                                Html: { Charset: 'UTF-8', Data: template.HtmlPart },
                                Text: { Charset: 'UTF-8', Data: template.TextPart },
                            },
                        });
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.templateContent.get(name)];
                }
            });
        });
    };
    Sender.prototype.checkTemplate = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.ses.getTemplate({ TemplateName: name }, function (err, data) {
                            if (data) {
                                return resolve(true);
                            }
                            if (err && err.code === 'TemplateDoesNotExist') {
                                return resolve(false);
                            }
                            return reject(err);
                        });
                    })];
            });
        });
    };
    Sender.prototype.deployTemplate = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var templateExists, Template;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.templateLoaded.get(name)) {
                            return [2 /*return*/, true];
                        }
                        return [4 /*yield*/, this.checkTemplate(name)];
                    case 1:
                        templateExists = _a.sent();
                        if (templateExists) {
                            this.templateLoaded.set(name, true);
                            return [2 /*return*/, true];
                        }
                        return [4 /*yield*/, utils_1.readTemplate(this.path, name)];
                    case 2:
                        Template = _a.sent();
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.ses.createTemplate({ Template: Template }, function (err, data) {
                                    return err ? reject(err) : resolve(data);
                                });
                            })];
                    case 3:
                        _a.sent();
                        this.templateLoaded.set(name, true);
                        return [2 /*return*/, true];
                }
            });
        });
    };
    Sender.prototype.parseTemplate = function (name, replacements) {
        if (replacements === void 0) { replacements = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var template;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTemplate(name)];
                    case 1:
                        template = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, template), { Subject: __assign(__assign({}, template.Subject), { Data: this.replace(template.Subject.Data, replacements) }), Body: __assign(__assign({}, template.Body), { Html: __assign(__assign({}, template.Body.Html), { Data: this.replace(template.Body.Html.Data, replacements) }), Text: __assign(__assign({}, template.Body.Text), { Data: this.replace(template.Body.Text.Data, replacements) }) }) })];
                }
            });
        });
    };
    Sender.prototype.destination = function (value) {
        if (typeof value === 'string') {
            return { email: value, replacement: {} };
        }
        return value;
    };
    Sender.prototype.replace = function (template, replacements) {
        if (replacements === void 0) { replacements = {}; }
        return template.replace(/\{\{\w+\}\}/gi, function (match) {
            var name = match.slice(2, -2);
            if (name in replacements) {
                return replacements[name];
            }
            throw new Error("missing replacement " + name);
        });
    };
    return Sender;
}());
exports.default = Sender;
