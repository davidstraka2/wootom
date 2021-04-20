"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OuterEnvCaptionRenderer = void 0;
class OuterEnvCaptionRenderer {
    constructor() {
        this.kind = 'OuterEnv';
        this.abstractVariant = 'caption';
    }
    render(renderingManager, astNode) {
        const p = document.createElement('p');
        p.append(renderingManager.render(...astNode.children));
        return p;
    }
}
exports.OuterEnvCaptionRenderer = OuterEnvCaptionRenderer;
