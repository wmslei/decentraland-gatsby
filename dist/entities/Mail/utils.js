"use strict";
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
exports.renderTemplate = exports.readTemplate = void 0;
var server_1 = __importDefault(require("react-dom/server"));
var cherio_1 = __importDefault(require("cherio"));
var htmlmin_1 = __importDefault(require("htmlmin"));
var juice_1 = __importDefault(require("juice"));
var fs_1 = require("fs");
var util_1 = require("util");
var read = util_1.promisify(fs_1.readFile);
function readTemplate(path, name) {
    return __awaiter(this, void 0, void 0, function () {
        var TemplateName, target, html, $, SubjectPart, TextPart, HtmlPart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    TemplateName = name;
                    target = path + '/' + name + '.html';
                    return [4 /*yield*/, read(target, 'utf8')];
                case 1:
                    html = _a.sent();
                    $ = cherio_1.default.load(html);
                    SubjectPart = $('title').text().trim();
                    TextPart = $('noscript').text().trim();
                    HtmlPart = htmlmin_1.default(juice_1.default($.html().trim() || ''));
                    return [2 /*return*/, {
                            TemplateName: TemplateName,
                            SubjectPart: SubjectPart,
                            TextPart: TextPart,
                            HtmlPart: HtmlPart,
                        }];
            }
        });
    });
}
exports.readTemplate = readTemplate;
function renderTemplate(element) {
    return __awaiter(this, void 0, void 0, function () {
        var TemplateName, SubjectPart, TextPart, HtmlPart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    TemplateName = (element.props && element.props.name) || '';
                    SubjectPart = (element.props && element.props.subject) || '';
                    TextPart = (element.props && element.props.text) || '';
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            var stream = server_1.default.renderToNodeStream(element);
                            var result = '';
                            stream.setEncoding('utf8');
                            stream.on('error', reject);
                            stream.on('data', function (chunk) {
                                result += chunk;
                            });
                            stream.on('end', function (chunk) {
                                if (chunk) {
                                    result = result += chunk;
                                }
                                resolve(htmlmin_1.default(juice_1.default(result)));
                            });
                        })];
                case 1:
                    HtmlPart = _a.sent();
                    return [2 /*return*/, {
                            TemplateName: TemplateName,
                            SubjectPart: SubjectPart,
                            TextPart: TextPart,
                            HtmlPart: HtmlPart,
                        }];
            }
        });
    });
}
exports.renderTemplate = renderTemplate;
