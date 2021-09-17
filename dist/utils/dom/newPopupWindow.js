"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sizes = {
    small: { width: 600, height: 250 },
    large: { width: 600, height: 600 },
};
function newPopupWindow(url, size) {
    if (size === void 0) { size = 'small'; }
    var _a = sizes[size] || sizes['small'], width = _a.width, height = _a.height;
    var top = Math.ceil(window.outerHeight / 2 - height / 2);
    var left = Math.ceil(window.outerWidth / 2 - width / 2);
    window.open(url, 'sharer', "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left);
}
exports.default = newPopupWindow;
