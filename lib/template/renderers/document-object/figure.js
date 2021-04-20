"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentObjectFigureRenderer = void 0;
class DocumentObjectFigureRenderer {
    constructor() {
        this.kind = 'DocumentObject';
        this.abstractVariant = 'figure';
    }
    render(renderingManager, astNode) {
        const div = document.createElement('div');
        div.append(renderingManager.render(...astNode.children));
        return div;
    }
}
exports.DocumentObjectFigureRenderer = DocumentObjectFigureRenderer;
