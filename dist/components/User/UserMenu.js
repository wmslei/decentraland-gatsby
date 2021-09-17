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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var schemas_1 = require("@dcl/schemas");
var Button_1 = require("decentraland-ui/dist/components/Button/Button");
var UserMenu_1 = require("decentraland-ui/dist/components/UserMenu/UserMenu");
var useAuthContext_1 = __importDefault(require("../../context/Auth/useAuthContext"));
var useProfileContext_1 = __importDefault(require("../../context/Auth/useProfileContext"));
var useAsyncMemo_1 = __importDefault(require("../../hooks/useAsyncMemo"));
require("./UserMenu.css");
var useChainId_1 = __importDefault(require("../../hooks/useChainId"));
var manaBalance_1 = require("../../utils/loader/manaBalance");
function UserMenu(props) {
    var _this = this;
    var i18n = __assign(__assign({}, UserMenu_1.UserMenu.defaultProps.i18n), props.i18n);
    var _a = __read(useAuthContext_1.default(), 2), user = _a[0], userState = _a[1];
    var _b = __read(useProfileContext_1.default(), 2), profile = _b[0], profileState = _b[1];
    var chainId = useChainId_1.default();
    var loading = userState.loading || profileState.loading;
    var _c = __read(useAsyncMemo_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b, ETHEREUM, MATIC, _c, ETHEREUM, MATIC, MATIC;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (props.hideBalance || !user) {
                        return [2 /*return*/, {}];
                    }
                    _a = chainId;
                    switch (_a) {
                        case schemas_1.ChainId.ETHEREUM_MAINNET: return [3 /*break*/, 1];
                        case schemas_1.ChainId.ETHEREUM_GOERLI: return [3 /*break*/, 3];
                        case schemas_1.ChainId.ETHEREUM_RINKEBY: return [3 /*break*/, 3];
                        case schemas_1.ChainId.ETHEREUM_ROPSTEN: return [3 /*break*/, 3];
                        case schemas_1.ChainId.MATIC_MAINNET: return [3 /*break*/, 5];
                        case schemas_1.ChainId.MATIC_MUMBAI: return [3 /*break*/, 5];
                    }
                    return [3 /*break*/, 7];
                case 1: return [4 /*yield*/, Promise.all([
                        manaBalance_1.fetchManaBalance(user, chainId),
                        manaBalance_1.fetchManaBalance(user, schemas_1.ChainId.MATIC_MAINNET),
                    ])];
                case 2:
                    _b = __read.apply(void 0, [_d.sent(), 2]), ETHEREUM = _b[0], MATIC = _b[1];
                    return [2 /*return*/, { ETHEREUM: ETHEREUM, MATIC: MATIC }];
                case 3: return [4 /*yield*/, Promise.all([
                        manaBalance_1.fetchManaBalance(user, chainId),
                        manaBalance_1.fetchManaBalance(user, schemas_1.ChainId.MATIC_MUMBAI),
                    ])];
                case 4:
                    _c = __read.apply(void 0, [_d.sent(), 2]), ETHEREUM = _c[0], MATIC = _c[1];
                    return [2 /*return*/, { ETHEREUM: ETHEREUM, MATIC: MATIC }];
                case 5: return [4 /*yield*/, manaBalance_1.fetchManaBalance(user, chainId)];
                case 6:
                    MATIC = _d.sent();
                    return [2 /*return*/, { MATIC: MATIC }];
                case 7: return [2 /*return*/, {}];
            }
        });
    }); }, [user, chainId, props.hideBalance]), 1), manaBalances = _c[0];
    if (!user || loading) {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(Button_1.Button, { size: "small", basic: true, loading: loading, disabled: loading, onClick: function () { return userState.select(); } }, i18n.signIn)));
    }
    return (react_1.default.createElement("div", { className: "dcl-avatar--" + user[2] },
        react_1.default.createElement(UserMenu_1.UserMenu, __assign({}, props, { isSignedIn: true, i18n: i18n, manaBalances: manaBalances || {}, avatar: (profile || undefined), onSignOut: function () { return userState.disconnect(); } }))));
}
exports.default = UserMenu;
