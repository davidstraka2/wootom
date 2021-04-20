"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultDocumentPartRenderer = void 0;
const error_block_1 = require("../../../util/html-components/error-block");
class DefaultDocumentPartRenderer {
    constructor() {
        this.kind = 'DocumentPart';
    }
    render(renderingManager, astNode) {
        const documentPart = astNode;
        const message = `Unknown document part variant "${documentPart.variant}"`;
        return error_block_1.errorBlockComponent({
            title: message,
            children: [renderingManager.render(...documentPart.children)],
        });
    }
}
exports.DefaultDocumentPartRenderer = DefaultDocumentPartRenderer;
