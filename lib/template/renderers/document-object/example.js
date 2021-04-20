"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentObjectExampleRenderer = void 0;
const info_block_1 = require("../../../util/html-components/info-block");
class DocumentObjectExampleRenderer {
    constructor() {
        this.kind = 'DocumentObject';
        this.abstractVariant = 'example';
    }
    render(renderingManager, astNode) {
        let title = 'Example';
        const titleMetadata = astNode.getMetadata('title');
        if (typeof titleMetadata === 'string')
            title += `: ${titleMetadata}`;
        return info_block_1.infoBlockComponent({
            title,
            children: [renderingManager.render(...astNode.children)],
        });
    }
}
exports.DocumentObjectExampleRenderer = DocumentObjectExampleRenderer;
