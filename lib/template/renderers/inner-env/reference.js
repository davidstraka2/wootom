"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnerEnvReferenceRenderer = void 0;
/** Renderer of the reference inner environment */
class InnerEnvReferenceRenderer {
    constructor() {
        this.kind = 'InnerEnv';
        this.abstractVariant = 'reference';
    }
    render(renderingManager, astNode) {
        return renderingManager.render(...astNode.children);
    }
}
exports.InnerEnvReferenceRenderer = InnerEnvReferenceRenderer;
