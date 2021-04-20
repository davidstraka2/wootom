"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentRootRenderer = void 0;
class DocumentRootRenderer {
    constructor() {
        this.kind = 'DocumentRoot';
    }
    render(renderingManager, astNode) {
        return renderingManager.render(...astNode.children);
    }
}
exports.DocumentRootRenderer = DocumentRootRenderer;
