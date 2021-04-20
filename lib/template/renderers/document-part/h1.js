"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentPartH1Renderer = void 0;
class DocumentPartH1Renderer {
    constructor() {
        this.kind = 'DocumentPart';
        this.abstractVariant = 'h1';
    }
    render(renderingManager, astNode) {
        const h = document.createElement('h1');
        h.append(renderingManager.render(...astNode.children));
        return h;
    }
}
exports.DocumentPartH1Renderer = DocumentPartH1Renderer;
