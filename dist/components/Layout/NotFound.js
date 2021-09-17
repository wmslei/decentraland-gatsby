"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Container_1 = require("decentraland-ui/dist/components/Container/Container");
var Head_1 = __importDefault(require("../Head/Head"));
var Title_1 = __importDefault(require("../Text/Title"));
var Paragraph_1 = __importDefault(require("../Text/Paragraph"));
exports.default = react_1.default.memo(function NotFound(props) {
    var title = props.title || 'Not found';
    var description = props.description || "You just hit a route that doesn't exist...";
    var image = props.image || 'https://decentraland.org/images/decentraland.png';
    return (react_1.default.createElement(Container_1.Container, null,
        react_1.default.createElement(Head_1.default, { title: title, description: description, image: image }),
        react_1.default.createElement("div", { style: {
                minHeight: '75vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            } },
            react_1.default.createElement(Title_1.default, { style: { textTransform: 'uppercase' } }, title),
            react_1.default.createElement(Paragraph_1.default, null, description))));
});
