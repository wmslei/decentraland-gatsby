"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var gatsby_plugin_intl_1 = require("gatsby-plugin-intl");
var intl_1 = require("../utils/react/intl");
function useFormatMessage() {
    var intl = gatsby_plugin_intl_1.useIntl();
    return react_1.useMemo(function () { return intl_1.createFormatMessage(intl); }, [intl]);
}
exports.default = useFormatMessage;
