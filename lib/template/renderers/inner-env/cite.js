"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnerEnvCiteRenderer = void 0;
/** Renderer of the cite inner environment */
class InnerEnvCiteRenderer {
    constructor() {
        this.kind = 'InnerEnv';
        this.abstractVariant = 'cite';
    }
    render(renderingManager, astNode) {
        const cite = document.createElement('cite');
        cite.append('[', renderingManager.render(...astNode.children), ']');
        return cite;
    }
}
exports.InnerEnvCiteRenderer = InnerEnvCiteRenderer;
