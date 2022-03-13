"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentObjectDefinitionRenderer = void 0;
const styles_1 = require("../../../util/lists/styles");
const basic_object_1 = require("./basic-object");
/** Renderer of the definition document object */
class DocumentObjectDefinitionRenderer extends basic_object_1.BasicObjectRenderer {
    constructor() {
        super(...arguments);
        this.abstractVariant = 'definition';
        /** @override */
        this.title = 'Definition';
        /** @override */
        this.hasOptionalMetaTitle = true;
        /** @override */
        this.titleBackgroundColor = styles_1.InfoBlockColors.Green;
    }
}
exports.DocumentObjectDefinitionRenderer = DocumentObjectDefinitionRenderer;
