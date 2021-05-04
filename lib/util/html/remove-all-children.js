"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAllChildren = void 0;
function removeAllChildren(node) {
    while (node.lastChild !== null)
        node.removeChild(node.lastChild);
}
exports.removeAllChildren = removeAllChildren;
