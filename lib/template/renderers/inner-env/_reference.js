"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnerEnvUReferenceRenderer = void 0;
class InnerEnvUReferenceRenderer {
    constructor() {
        this.kind = 'InnerEnv';
        this.abstractVariant = '_reference';
    }
    render(renderingManager, astNode) {
        return renderingManager.render(...astNode.children);
    }
}
exports.InnerEnvUReferenceRenderer = InnerEnvUReferenceRenderer;