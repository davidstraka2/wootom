"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnerEnvCodeRenderer = void 0;
class InnerEnvCodeRenderer {
    constructor() {
        this.kind = 'InnerEnv';
        this.abstractVariant = 'code';
    }
    render(renderingManager, astNode) {
        const code = document.createElement('code');
        code.append(renderingManager.render(...astNode.children));
        return code;
    }
}
exports.InnerEnvCodeRenderer = InnerEnvCodeRenderer;
