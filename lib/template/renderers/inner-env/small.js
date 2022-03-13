"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnerEnvSmallRenderer = void 0;
/** Renderer of the small inner environment */
class InnerEnvSmallRenderer {
    constructor() {
        this.kind = 'InnerEnv';
        this.abstractVariant = 'small';
    }
    render(renderingManager, astNode) {
        const small = document.createElement('small');
        small.append(renderingManager.render(...astNode.children));
        return small;
    }
}
exports.InnerEnvSmallRenderer = InnerEnvSmallRenderer;
