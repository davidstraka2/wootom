"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentPartH3Renderer = void 0;
class DocumentPartH3Renderer {
    constructor() {
        this.kind = 'DocumentPart';
        this.abstractVariant = 'h3';
    }
    render(renderingManager, astNode) {
        const h = document.createElement('h3');
        h.append(renderingManager.render(...astNode.children));
        return h;
    }
}
exports.DocumentPartH3Renderer = DocumentPartH3Renderer;
