"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentObjectTheoremRenderer = void 0;
const styles_1 = require("../../../util/lists/styles");
const basic_object_1 = require("./basic-object");
/** Renderer of the theorem document object */
class DocumentObjectTheoremRenderer extends basic_object_1.BasicObjectRenderer {
    constructor() {
        super(...arguments);
        this.abstractVariant = 'theorem';
        /** @override */
        this.title = 'Theorem';
        /** @override */
        this.hasOptionalMetaTitle = true;
        /** @override */
        this.titleBackgroundColor = styles_1.InfoBlockColors.Blue;
    }
}
exports.DocumentObjectTheoremRenderer = DocumentObjectTheoremRenderer;
