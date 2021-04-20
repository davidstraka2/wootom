"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnerEnvQuotedRenderer = void 0;
class InnerEnvQuotedRenderer {
    constructor() {
        this.kind = 'InnerEnv';
        this.abstractVariant = 'quoted';
    }
    render(renderingManager, astNode) {
        const fragment = document.createDocumentFragment();
        fragment.append('„');
        fragment.append(renderingManager.render(...astNode.children));
        fragment.append('“');
        return fragment;
    }
}
exports.InnerEnvQuotedRenderer = InnerEnvQuotedRenderer;
