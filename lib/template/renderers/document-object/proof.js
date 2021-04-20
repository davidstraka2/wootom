"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentObjectProofRenderer = void 0;
const info_block_1 = require("../../../util/html-components/info-block");
class DocumentObjectProofRenderer {
    constructor() {
        this.kind = 'DocumentObject';
        this.abstractVariant = 'proof';
    }
    render(renderingManager, astNode) {
        let title = 'Proof';
        const titleMetadata = astNode.getMetadata('title');
        if (typeof titleMetadata === 'string')
            title += `: ${titleMetadata}`;
        return info_block_1.infoBlockComponent({
            title,
            children: [renderingManager.render(...astNode.children)],
        });
    }
}
exports.DocumentObjectProofRenderer = DocumentObjectProofRenderer;
