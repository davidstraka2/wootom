"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OuterEnvEnumerateRenderer = void 0;
class OuterEnvEnumerateRenderer {
    constructor() {
        this.kind = 'OuterEnv';
        this.abstractVariant = 'enumerate';
    }
    render(renderingManager, astNode) {
        const enumerate = document.createElement('ol');
        enumerate.append(renderingManager.render(...astNode.children));
        return enumerate;
    }
}
exports.OuterEnvEnumerateRenderer = OuterEnvEnumerateRenderer;
