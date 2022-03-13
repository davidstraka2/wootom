"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OuterEnvItemizeRenderer = void 0;
class OuterEnvItemizeRenderer {
    constructor() {
        this.kind = 'OuterEnv';
        this.abstractVariant = 'itemize';
    }
    render(renderingManager, astNode) {
        const itemize = document.createElement('ul');
        itemize.append(renderingManager.render(...astNode.children));
        return itemize;
    }
}
exports.OuterEnvItemizeRenderer = OuterEnvItemizeRenderer;
