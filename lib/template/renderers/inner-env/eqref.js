"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnerEnvEqrefRenderer = void 0;
/** Renderer of the eqref inner environment */
class InnerEnvEqrefRenderer {
    constructor() {
        this.kind = 'InnerEnv';
        this.abstractVariant = 'eqref';
    }
    render(renderingManager, astNode) {
        return renderingManager.render(...astNode.children);
    }
}
exports.InnerEnvEqrefRenderer = InnerEnvEqrefRenderer;
