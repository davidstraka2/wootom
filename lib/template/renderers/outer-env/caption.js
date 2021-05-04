"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OuterEnvCaptionRenderer = void 0;
/** Renderer of the caption outer environment */
class OuterEnvCaptionRenderer {
    constructor() {
        this.kind = 'OuterEnv';
        this.abstractVariant = 'caption';
    }
    render(renderingManager, astNode) {
        const container = document.createElement('div');
        container.append(renderingManager.render(...astNode.children));
        container.classList.add('wootom-caption');
        return container;
    }
}
exports.OuterEnvCaptionRenderer = OuterEnvCaptionRenderer;
