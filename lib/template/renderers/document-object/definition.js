"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentObjectDefinitionRenderer = void 0;
const info_block_1 = require("../../../util/html-components/info-block");
class DocumentObjectDefinitionRenderer {
    constructor() {
        this.kind = 'DocumentObject';
        this.abstractVariant = 'definition';
    }
    render(renderingManager, astNode) {
        let title = 'Definition';
        const titleMetadata = astNode.getMetadata('title');
        if (typeof titleMetadata === 'string')
            title += `: ${titleMetadata}`;
        return info_block_1.infoBlockComponent({
            title,
            children: [renderingManager.render(...astNode.children)],
        });
    }
}
exports.DocumentObjectDefinitionRenderer = DocumentObjectDefinitionRenderer;
