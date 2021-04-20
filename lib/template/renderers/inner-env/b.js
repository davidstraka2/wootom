"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnerEnvBRenderer = void 0;
class InnerEnvBRenderer {
    constructor() {
        this.kind = 'InnerEnv';
        this.abstractVariant = 'b';
    }
    render(renderingManager, astNode) {
        const strong = document.createElement('strong');
        strong.append(renderingManager.render(...astNode.children));
        return strong;
    }
}
exports.InnerEnvBRenderer = InnerEnvBRenderer;
