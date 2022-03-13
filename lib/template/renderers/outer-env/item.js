"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OuterEnvItemRenderer = void 0;
class OuterEnvItemRenderer {
    constructor() {
        this.kind = 'OuterEnv';
        this.abstractVariant = 'item';
    }
    render(renderingManager, astNode) {
        const item = document.createElement('li');
        item.append(renderingManager.render(...astNode.children));
        return item;
    }
}
exports.OuterEnvItemRenderer = OuterEnvItemRenderer;
