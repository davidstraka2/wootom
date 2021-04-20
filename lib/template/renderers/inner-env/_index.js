"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnerEnvIndexRenderer = void 0;
class InnerEnvIndexRenderer {
    constructor() {
        this.kind = 'InnerEnv';
        this.abstractVariant = '_index';
    }
    render(renderingManager, astNode) {
        const index = astNode.getMetadata('_index');
        const children = renderingManager.render(...astNode.children);
        if (typeof index !== 'string')
            return children;
        let parent = astNode.parent;
        while (typeof parent !== 'undefined' && (parent === null || parent === void 0 ? void 0 : parent.kind) !== 'TextBlock') {
            parent = astNode.parent;
        }
        if (typeof parent === 'undefined')
            return children;
        const indexValue = parent.getMetadata(index);
        if (typeof indexValue !== 'object' && indexValue !== null)
            return children;
        const link = indexValue['link'];
        if (typeof link !== 'string')
            return children;
        const a = document.createElement('a');
        a.href = link;
        a.append(children);
        return a;
    }
}
exports.InnerEnvIndexRenderer = InnerEnvIndexRenderer;
