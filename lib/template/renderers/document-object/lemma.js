"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentObjectLemmaRenderer = void 0;
const styles_1 = require("../../../util/lists/styles");
const basic_object_1 = require("./basic-object");
/** Renderer of the lemma document object */
class DocumentObjectLemmaRenderer extends basic_object_1.BasicObjectRenderer {
    constructor() {
        super(...arguments);
        this.abstractVariant = 'lemma';
        /** @override */
        this.title = 'Lemma';
        /** @override */
        this.hasOptionalMetaTitle = true;
        /** @override */
        this.titleBackgroundColor = styles_1.InfoBlockColors.Blue;
    }
}
exports.DocumentObjectLemmaRenderer = DocumentObjectLemmaRenderer;
