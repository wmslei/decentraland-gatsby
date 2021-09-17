"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createId = void 0;
function createId(props) {
    if (props.id) {
        return props.id;
    }
    if (props.children && typeof props.children === 'string') {
        var id = String(props.children).replace(/\W+/gi, '-').toLowerCase();
        if (id[0] === '-') {
            id = id.slice(1);
        }
        if (id[id.length - 1] === '-') {
            id = id.slice(0, -1);
        }
        return id;
    }
    return undefined;
}
exports.createId = createId;
