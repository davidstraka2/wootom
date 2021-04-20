"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnerEnvIRenderer = void 0;
class InnerEnvIRenderer {
    constructor() {
        this.kind = 'InnerEnv';
        this.abstractVariant = 'i';
    }
    render(renderingManager, astNode) {
        const strong = document.createElement('em');
        strong.append(renderingManager.render(...astNode.children));
        return strong;
    }
}
exports.InnerEnvIRenderer = InnerEnvIRenderer;
