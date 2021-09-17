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
var SingletonListener_1 = __importDefault(require("./SingletonListener"));
var createTarget = function () {
    var target = new SingletonListener_1.default({
        addEventListener: function () { return null; },
        removeEventListener: function () { return null; },
    });
    jest.spyOn(target, 'addEventListener');
    jest.spyOn(target, 'removeEventListener');
    return target;
};
describe(SingletonListener_1.default.name, function () {
    var handleMock1 = jest.fn();
    var handleMock2 = jest.fn();
    var data = {};
    var target = createTarget();
    var listener = new SingletonListener_1.default(target);
    test('#from', function () {
        var listener1 = SingletonListener_1.default.from(target);
        var listener2 = SingletonListener_1.default.from(target);
        expect(listener1).not.toBe(listener);
        expect(listener2).not.toBe(listener);
        expect(listener1).toBe(listener2);
    });
    test('addEventListener', function () {
        listener.addEventListener('click', handleMock1);
        listener.addEventListener('click', handleMock2);
        listener.addEventListener('blur', handleMock1);
        listener.addEventListener('blur', handleMock1);
        listener.addEventListener('blur', handleMock2);
        listener.addEventListener('blur', handleMock2);
        listener.addEventListener('blur', handleMock2);
        expect(listener.size).toBe(7);
        expect(target.addEventListener.mock.calls.length).toBe(2);
    });
    test('dispatch', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, target.dispatch('click', data)];
                case 1:
                    _a.sent();
                    expect(handleMock1.mock.calls.length).toEqual(1);
                    expect(handleMock2.mock.calls.length).toEqual(1);
                    return [4 /*yield*/, target.dispatch('blur', data)];
                case 2:
                    _a.sent();
                    expect(handleMock1.mock.calls.length).toBe(3);
                    expect(handleMock2.mock.calls.length).toBe(4);
                    return [2 /*return*/];
            }
        });
    }); });
    test('removeEventListener', function () {
        listener.removeEventListener('click', handleMock1);
        expect(listener.size).toBe(6);
        expect(target.removeEventListener.mock.calls.length).toBe(0);
        listener.removeEventListener('click', handleMock2);
        expect(listener.size).toBe(5);
        expect(target.removeEventListener.mock.calls.length).toBe(1);
        listener.removeEventListener('blur', handleMock1);
        expect(listener.size).toBe(3);
        expect(target.removeEventListener.mock.calls.length).toBe(1);
        listener.removeEventListener('blur', handleMock2);
        expect(listener.size).toBe(0);
        expect(target.removeEventListener.mock.calls.length).toBe(2);
    });
});
