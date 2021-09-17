"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var server_1 = __importDefault(require("react-dom/server"));
var react_intl_1 = require("react-intl");
var intl_1 = require("./intl");
var flat_1 = __importDefault(require("flat"));
var Paragraph_1 = __importDefault(require("../../components/Text/Paragraph"));
var Italic_1 = __importDefault(require("../../components/Text/Italic"));
var Bold_1 = __importDefault(require("../../components/Text/Bold"));
var Link_1 = __importDefault(require("../../components/Text/Link"));
var Code_1 = __importDefault(require("../../components/Text/Code"));
describe(__filename, function () {
    var intl = react_intl_1.createIntl({
        locale: 'en',
        messages: flat_1.default({
            empty: '',
            paragraph: '1rt paragraph: regular message with data: {value}.',
            decorations: '2nd paragraph: *italic*, **bold**, [innerLink](#) and [outerLink](https://decentraland.com).',
            breakLine: '1rt paragraph\n\n2nd paragraph.',
            list: [
                { text: 'item 1 ({index}, {isFirst}, {isLast}).' },
                { text: 'item 2 ({index}, {isFirst}, {isLast}).' },
                { text: 'item 3 ({index}, {isFirst}, {isLast}).' },
            ],
            code: 'code block:\n\n```\n  const variable = "value";\n```\n\nthis is and example.',
            inlineCode: 'inline `code` example.',
            highlightCode: 'code block:\n\n```typescript\n  const variable = "value";\n```\n\nthis is and example.',
        }),
    });
    var l = intl_1.createFormatMessage(intl);
    test("l.isEmpty(\"invalid\")", function () { return expect(l.isEmpty('invalid')).toBe(true); });
    test("l.isEmpty(\"empty\")", function () { return expect(l.isEmpty('empty')).toBe(true); });
    test("l.isEmpty(\"paragraph\")", function () {
        return expect(l.isEmpty('paragraph')).toBe(false);
    });
    test("l.str(\"invalid\")", function () { return expect(l('invalid')).toBe(null); });
    test("l.str(\"empty\")", function () { return expect(l('empty')).toBe(null); });
    test("l.str(\"paragraph\")", function () {
        return expect(l('paragraph', { value: 2 })).toBe('1rt paragraph: regular message with data: 2.');
    });
    function expectRender(element, toBe) {
        return expect(element && server_1.default.renderToStaticMarkup(react_1.default.createElement(react_1.default.Fragment, null, element))).toBe(toBe && server_1.default.renderToStaticMarkup(toBe));
    }
    test("l(\"invalid\")", function () { return expectRender(l.markdown('invalid'), null); });
    test("l(\"empty\")", function () { return expectRender(l.markdown('empty'), null); });
    test("l(\"paragraph\")", function () {
        return expectRender(l.markdown('paragraph', { value: 1 }), react_1.default.createElement(Paragraph_1.default, null, "1rt paragraph: regular message with data: 1."));
    });
    test("l(\"decorations\")", function () {
        return expectRender(l.markdown('decorations'), react_1.default.createElement(Paragraph_1.default, null,
            "2nd paragraph: ",
            react_1.default.createElement(Italic_1.default, null, "italic"),
            ", ",
            react_1.default.createElement(Bold_1.default, null, "bold"),
            ",",
            ' ',
            react_1.default.createElement(Link_1.default, { target: "", href: "#" }, "innerLink"),
            ' ',
            "and",
            ' ',
            react_1.default.createElement(Link_1.default, { target: "_blank", href: "https://decentraland.com" }, "outerLink"),
            "."));
    });
    test("l(\"breakLine\")", function () {
        return expectRender(l.markdown('breakLine'), react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Paragraph_1.default, null, "1rt paragraph"),
            react_1.default.createElement(Paragraph_1.default, null, "2nd paragraph.")));
    });
    test("l(\"code\")", function () {
        return expectRender(l.markdown('code'), react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Paragraph_1.default, null, "code block:"),
            react_1.default.createElement(Code_1.default, null, "  const variable = \"value\";"),
            react_1.default.createElement(Paragraph_1.default, null, "this is and example.")));
    });
    test("l(\"inlineCode\")", function () {
        return expectRender(l.markdown('inlineCode'), react_1.default.createElement(Paragraph_1.default, null,
            "inline ",
            react_1.default.createElement(Code_1.default, { inline: true }, "code"),
            " example."));
    });
    test("l(\"highlightCode\")", function () {
        return expectRender(l.markdown('highlightCode'), react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Paragraph_1.default, null, "code block:"),
            react_1.default.createElement(Code_1.default, { language: "typescript" }, "  const variable = \"value\";"),
            react_1.default.createElement(Paragraph_1.default, null, "this is and example.")));
    });
});
