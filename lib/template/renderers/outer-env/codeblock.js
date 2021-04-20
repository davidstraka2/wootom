"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OuterEnvCodeblockRenderer = void 0;
class OuterEnvCodeblockRenderer {
    constructor() {
        this.kind = 'OuterEnv';
        this.abstractVariant = 'codeblock';
    }
    render(renderingManager, astNode) {
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.append(renderingManager.render(...astNode.children));
        pre.append(code);
        return pre;
    }
}
exports.OuterEnvCodeblockRenderer = OuterEnvCodeblockRenderer;
