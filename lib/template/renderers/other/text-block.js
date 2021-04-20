"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextBlockRenderer = void 0;
class TextBlockRenderer {
    constructor() {
        this.kind = 'TextBlock';
    }
    render(renderingManager, astNode) {
        const p = document.createElement('p');
        p.append(renderingManager.render(...astNode.children));
        return p;
    }
}
exports.TextBlockRenderer = TextBlockRenderer;
