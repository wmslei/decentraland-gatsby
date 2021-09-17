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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedTypes = exports.renderers = void 0;
var react_1 = __importDefault(require("react"));
var react_markdown_1 = __importDefault(require("react-markdown"));
var Table_1 = require("decentraland-ui/dist/components/Table/Table");
var MainTitle_1 = __importDefault(require("./MainTitle"));
var Title_1 = __importDefault(require("./Title"));
var SubTitle_1 = __importDefault(require("./SubTitle"));
var Paragraph_1 = __importDefault(require("./Paragraph"));
var Italic_1 = __importDefault(require("./Italic"));
var Bold_1 = __importDefault(require("./Bold"));
var Code_1 = __importDefault(require("./Code"));
var Link_1 = __importDefault(require("./Link"));
var Blockquote_1 = __importDefault(require("./Blockquote"));
exports.renderers = {
    heading: function (_a) {
        var level = _a.level, props = __rest(_a, ["level"]);
        switch (level) {
            case 1:
                return react_1.default.createElement(MainTitle_1.default, __assign({}, props));
            case 2:
                return react_1.default.createElement(Title_1.default, __assign({}, props));
            default:
                return react_1.default.createElement(SubTitle_1.default, __assign({}, props));
        }
    },
    paragraph: Paragraph_1.default,
    emphasis: Italic_1.default,
    strong: Bold_1.default,
    link: Link_1.default,
    code: Code_1.default,
    inlineCode: Code_1.default,
    blockquote: Blockquote_1.default,
    list: function (props) {
        switch (props.ordered) {
            case true:
                return react_1.default.createElement("ol", { start: props.start }, props.children);
            case false:
            default:
                return react_1.default.createElement("ul", null, props.children);
        }
    },
    listItem: function (props) {
        return (react_1.default.createElement("li", __assign({}, props),
            react_1.default.createElement(Paragraph_1.default, null,
                typeof props.checked === 'boolean' && (react_1.default.createElement("input", { type: "checkbox", checked: props.checked, readOnly: true, style: { marginRight: '.5em' } })),
                props.children)));
    },
    table: function (props) { return (react_1.default.createElement(Table_1.Table, { basic: "very" }, props.children)); },
    tableHead: function (props) { return (react_1.default.createElement(Table_1.Table.Header, null, props.children)); },
    tableBody: function (props) { return (react_1.default.createElement(Table_1.Table.Body, null, props.children)); },
    tableRow: function (props) { return (react_1.default.createElement(Table_1.Table.Row, null, props.children)); },
    tableCell: function (props) {
        return props.isHeader ? (react_1.default.createElement(Table_1.Table.HeaderCell, { textAlign: props.align || undefined }, props.children)) : (react_1.default.createElement(Table_1.Table.Cell, { textAlign: props.align || undefined }, props.children));
    },
};
exports.allowedTypes = ['root', 'text'].concat(Object.keys(exports.renderers));
exports.default = react_1.default.memo(function Markdown(props) {
    return (react_1.default.createElement(react_markdown_1.default, __assign({}, props, { renderers: exports.renderers, allowedTypes: exports.allowedTypes })));
});
