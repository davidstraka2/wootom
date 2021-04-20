"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OuterEnvTikzRenderer = void 0;
class OuterEnvTikzRenderer {
    constructor() {
        this.kind = 'OuterEnv';
        this.abstractVariant = 'tikz';
    }
    render(renderingManager, astNode) {
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.append(renderingManager.render(...astNode.children));
        pre.append(code);
        return pre;
    }
}
exports.OuterEnvTikzRenderer = OuterEnvTikzRenderer;
