"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentObjectAlgorithmRenderer = void 0;
const styles_1 = require("../../../util/lists/styles");
const basic_object_1 = require("./basic-object");
/** Renderer of the algorithm document object */
class DocumentObjectAlgorithmRenderer extends basic_object_1.BasicObjectRenderer {
    constructor() {
        super(...arguments);
        this.abstractVariant = 'algorithm';
        /** @override */
        this.title = 'Algorithm';
        /** @override */
        this.hasOptionalMetaTitle = true;
        /** @override */
        this.titleBackgroundColor = styles_1.InfoBlockColors.Blue;
    }
}
exports.DocumentObjectAlgorithmRenderer = DocumentObjectAlgorithmRenderer;
