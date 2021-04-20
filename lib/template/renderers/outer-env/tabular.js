"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OuterEnvTabularRenderer = void 0;
class OuterEnvTabularRenderer {
    constructor() {
        this.kind = 'OuterEnv';
        this.abstractVariant = 'tabular';
    }
    render(renderingManager, astNode) {
        const pre = document.createElement('pre');
        pre.append(renderingManager.render(...astNode.children));
        return pre;
    }
}
exports.OuterEnvTabularRenderer = OuterEnvTabularRenderer;
