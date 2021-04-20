"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentPartH2Renderer = void 0;
class DocumentPartH2Renderer {
    constructor() {
        this.kind = 'DocumentPart';
        this.abstractVariant = 'h2';
    }
    render(renderingManager, astNode) {
        const h = document.createElement('h2');
        h.append(renderingManager.render(...astNode.children));
        return h;
    }
}
exports.DocumentPartH2Renderer = DocumentPartH2Renderer;
