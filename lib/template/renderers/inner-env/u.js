"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnerEnvURenderer = void 0;
/** Renderer of the u (unarticulated, underlined) inner environment */
class InnerEnvURenderer {
    constructor() {
        this.kind = 'InnerEnv';
        this.abstractVariant = 'u';
    }
    render(renderingManager, astNode) {
        const u = document.createElement('u');
        u.append(renderingManager.render(...astNode.children));
        return u;
    }
}
exports.InnerEnvURenderer = InnerEnvURenderer;
