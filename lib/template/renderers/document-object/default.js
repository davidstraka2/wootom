"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultDocumentObjectRenderer = void 0;
const error_block_1 = require("../../../util/html-components/error-block");
/** Default renderer of document objects */
class DefaultDocumentObjectRenderer {
    constructor() {
        this.kind = 'DocumentObject';
    }
    render(renderingManager, astNode) {
        const documentObject = astNode;
        const message = `Unknown document object variant "${documentObject.variant}"`;
        return error_block_1.errorBlockComponent({
            title: message,
            children: [renderingManager.render(...documentObject.children)],
        });
    }
}
exports.DefaultDocumentObjectRenderer = DefaultDocumentObjectRenderer;
