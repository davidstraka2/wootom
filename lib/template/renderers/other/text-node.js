"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextNodeRenderer = void 0;
class TextNodeRenderer {
    constructor() {
        this.kind = 'TextNode';
    }
    render(renderingManager, astNode) {
        const textNode = astNode;
        return document.createTextNode(textNode.value);
    }
}
exports.TextNodeRenderer = TextNodeRenderer;
