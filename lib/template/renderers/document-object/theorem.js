"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentObjectTheoremRenderer = void 0;
const info_block_1 = require("../../../util/html-components/info-block");
class DocumentObjectTheoremRenderer {
    constructor() {
        this.kind = 'DocumentObject';
        this.abstractVariant = 'theorem';
    }
    render(renderingManager, astNode) {
        let title = 'Theorem';
        const titleMetadata = astNode.getMetadata('title');
        if (typeof titleMetadata === 'string')
            title += `: ${titleMetadata}`;
        return info_block_1.infoBlockComponent({
            title,
            children: [renderingManager.render(...astNode.children)],
        });
    }
}
exports.DocumentObjectTheoremRenderer = DocumentObjectTheoremRenderer;
