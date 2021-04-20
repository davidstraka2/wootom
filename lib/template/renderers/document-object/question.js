"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentObjectQuestionRenderer = void 0;
const info_block_1 = require("../../../util/html-components/info-block");
class DocumentObjectQuestionRenderer {
    constructor() {
        this.kind = 'DocumentObject';
        this.abstractVariant = 'question';
    }
    render(renderingManager, astNode) {
        let title = 'Question';
        const titleMetadata = astNode.getMetadata('title');
        if (typeof titleMetadata === 'string')
            title += `: ${titleMetadata}`;
        return info_block_1.infoBlockComponent({
            title,
            children: [renderingManager.render(...astNode.children)],
        });
    }
}
exports.DocumentObjectQuestionRenderer = DocumentObjectQuestionRenderer;
