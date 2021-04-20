"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentObjectLemmaRenderer = void 0;
const info_block_1 = require("../../../util/html-components/info-block");
class DocumentObjectLemmaRenderer {
    constructor() {
        this.kind = 'DocumentObject';
        this.abstractVariant = 'lemma';
    }
    render(renderingManager, astNode) {
        let title = 'Lemma';
        const titleMetadata = astNode.getMetadata('title');
        if (typeof titleMetadata === 'string')
            title += `: ${titleMetadata}`;
        return info_block_1.infoBlockComponent({
            title,
            children: [renderingManager.render(...astNode.children)],
        });
    }
}
exports.DocumentObjectLemmaRenderer = DocumentObjectLemmaRenderer;
