"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentObjectPropositionRenderer = void 0;
const styles_1 = require("../../../util/lists/styles");
const basic_object_1 = require("./basic-object");
/** Renderer of the proposition document object */
class DocumentObjectPropositionRenderer extends basic_object_1.BasicObjectRenderer {
    constructor() {
        super(...arguments);
        this.abstractVariant = 'proposition';
        /** @override */
        this.title = 'Proposition';
        /** @override */
        this.hasOptionalMetaTitle = true;
        /** @override */
        this.titleBackgroundColor = styles_1.InfoBlockColors.Blue;
    }
}
exports.DocumentObjectPropositionRenderer = DocumentObjectPropositionRenderer;
