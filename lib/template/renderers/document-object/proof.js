"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentObjectProofRenderer = void 0;
const basic_object_1 = require("./basic-object");
/** Renderer of the proof document object */
class DocumentObjectProofRenderer extends basic_object_1.BasicObjectRenderer {
    constructor() {
        super(...arguments);
        this.abstractVariant = 'proof';
        /** @override */
        this.title = 'Proof';
        /** @override */
        this.hasOptionalMetaTitle = true;
    }
}
exports.DocumentObjectProofRenderer = DocumentObjectProofRenderer;
