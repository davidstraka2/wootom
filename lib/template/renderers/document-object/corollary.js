"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentObjectCorollaryRenderer = void 0;
const info_block_1 = require("../../../util/html-components/info-block");
class DocumentObjectCorollaryRenderer {
    constructor() {
        this.kind = 'DocumentObject';
        this.abstractVariant = 'corollary';
    }
    render(renderingManager, astNode) {
        let title = 'Corollary';
        const titleMetadata = astNode.getMetadata('title');
        if (typeof titleMetadata === 'string')
            title += `: ${titleMetadata}`;
        return info_block_1.infoBlockComponent({
            title,
            children: [renderingManager.render(...astNode.children)],
        });
    }
}
exports.DocumentObjectCorollaryRenderer = DocumentObjectCorollaryRenderer;
