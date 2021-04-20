"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentObjectRemarkRenderer = void 0;
const info_block_1 = require("../../../util/html-components/info-block");
class DocumentObjectRemarkRenderer {
    constructor() {
        this.kind = 'DocumentObject';
        this.abstractVariant = 'remark';
    }
    render(renderingManager, astNode) {
        let title = 'Remark';
        const titleMetadata = astNode.getMetadata('title');
        if (typeof titleMetadata === 'string')
            title += `: ${titleMetadata}`;
        return info_block_1.infoBlockComponent({
            title,
            children: [renderingManager.render(...astNode.children)],
        });
    }
}
exports.DocumentObjectRemarkRenderer = DocumentObjectRemarkRenderer;
