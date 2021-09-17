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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.Prev = exports.Next = void 0;
var react_1 = __importStar(require("react"));
var usePatchState_1 = __importDefault(require("../../hooks/usePatchState"));
var TokenList_1 = __importDefault(require("../../utils/dom/TokenList"));
require("./Carousel.css");
function Next() {
    return (react_1.default.createElement("svg", { width: "48", height: "48", viewBox: "0 0 48 48" },
        react_1.default.createElement("g", { fill: "none", fillRule: "evenodd", opacity: ".32" },
            react_1.default.createElement("path", { d: "M0 0H48V48H0z" }),
            react_1.default.createElement("path", { fill: "#736E7D", d: "M34 24L21.242 36.457c-.742.724-1.944.724-2.686 0-.741-.724-.741-1.898 0-2.623L28.628 24l-10.072-9.834c-.741-.725-.741-1.899 0-2.623.742-.724 1.944-.724 2.686 0L34 24z" }))));
}
exports.Next = Next;
function Prev() {
    return (react_1.default.createElement("svg", { width: "48", height: "48", viewBox: "0 0 48 48" },
        react_1.default.createElement("g", { fill: "none", fillRule: "evenodd", opacity: ".32" },
            react_1.default.createElement("path", { d: "M0 0H48V48H0z", transform: "matrix(-1 0 0 1 48 0)" }),
            react_1.default.createElement("path", { fill: "#736E7D", d: "M34 24L21.242 36.457c-.742.724-1.944.724-2.686 0-.741-.724-.741-1.898 0-2.623L28.628 24l-10.072-9.834c-.741-.725-.741-1.899 0-2.623.742-.724 1.944-.724 2.686 0L34 24z", transform: "matrix(-1 0 0 1 48 0)" }))));
}
exports.Prev = Prev;
function Carousel(_a) {
    var className = _a.className, children = _a.children, progress = _a.progress, onMove = _a.onMove, time = _a.time, props = __rest(_a, ["className", "children", "progress", "onMove", "time"]);
    var timeout = !progress ? (time !== null && time !== void 0 ? time : 5000) || false : false;
    var size = react_1.default.Children.count(children);
    var _b = __read(usePatchState_1.default({
        current: 0,
        timer: null,
        running: true,
    }), 2), state = _b[0], patchState = _b[1];
    react_1.useEffect(function () {
        if (state.current > size) {
            handleMove(0);
        }
    }, [size]);
    react_1.useEffect(function () {
        if (timeout && state.running) {
            patchState({ timer: setTimeout(handleNext, timeout) });
        }
        return function () {
            if (state.timer) {
                clearTimeout(state.timer);
            }
        };
    }, [state.running, state.current, timeout]);
    function handleTimerOn() {
        patchState({ running: true });
    }
    function handleTimerOff() {
        if (state.timer) {
            clearTimeout(state.timer);
        }
        patchState({ timer: null, running: false });
    }
    function handleMove(to) {
        patchState({ current: to });
        if (onMove) {
            onMove(to);
        }
    }
    function handleNext() {
        var next = state.current >= size - 1 ? 0 : state.current + 1;
        handleMove(next);
    }
    function handlePrev() {
        var prev = state.current <= 0 ? size - 1 : state.current - 1;
        handleMove(prev);
    }
    return (react_1.default.createElement("div", __assign({}, props, { className: TokenList_1.default.join(['Carousel', className]) }),
        react_1.default.createElement("div", { className: "Carousel__Items" },
            react_1.default.createElement("div", { className: "Carousel__Scroll", onMouseEnter: handleTimerOff, onMouseLeave: handleTimerOn }, react_1.default.Children.map(children, function (child, i) { return (react_1.default.createElement("div", { key: 'item:' + i, className: TokenList_1.default.join([
                    'Carousel__Item',
                    i === 0 && 'Carousel__Item--first',
                    i < state.current && 'Carousel__Item--on-left',
                    i === state.current && 'Carousel__Item--active',
                    i > state.current && 'Carousel__Item--on-right',
                ]) }, child)); }))),
        size > 1 && (react_1.default.createElement("div", { className: "Carousel__List" }, react_1.default.Children.map(children, function (_, i) { return (react_1.default.createElement("div", { key: 'list:' + i, onClick: function () { return handleMove(i); }, className: TokenList_1.default.join([
                progress && i <= state.current && 'active',
                !progress && i === state.current && 'active',
            ]) },
            react_1.default.createElement("div", null))); }))),
        size > 1 && (react_1.default.createElement("div", { onClick: handleNext, className: TokenList_1.default.join([
                'Carousel__Next',
                progress && state.current === size - 1 && 'disabled',
            ]) },
            react_1.default.createElement(Next, null))),
        size > 1 && (react_1.default.createElement("div", { onClick: handlePrev, className: TokenList_1.default.join([
                'Carousel__Prev',
                progress && state.current === 0 && 'disabled',
            ]) },
            react_1.default.createElement(Prev, null)))));
}
exports.default = Carousel;
