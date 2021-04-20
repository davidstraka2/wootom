"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnerEnvReferenceRenderer = void 0;
class InnerEnvReferenceRenderer {
    constructor() {
        this.kind = 'InnerEnv';
        this.abstractVariant = '_reference';
    }
    render(renderingManager, astNode) {
        return renderingManager.render(...astNode.children);
    }
}
exports.InnerEnvReferenceRenderer = InnerEnvReferenceRenderer;
