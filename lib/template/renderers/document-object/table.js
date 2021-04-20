"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentObjectTableRenderer = void 0;
const info_block_1 = require("../../../util/html-components/info-block");
class DocumentObjectTableRenderer {
    constructor() {
        this.kind = 'DocumentObject';
        this.abstractVariant = 'table';
    }
    render(renderingManager, astNode) {
        let title = 'Table';
        const titleMetadata = astNode.getMetadata('title');
        if (typeof titleMetadata === 'string')
            title += `: ${titleMetadata}`;
        return info_block_1.infoBlockComponent({
            title,
            children: [renderingManager.render(...astNode.children)],
        });
    }
}
exports.DocumentObjectTableRenderer = DocumentObjectTableRenderer;
