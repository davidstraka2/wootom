"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentObjectWarningRenderer = void 0;
const styles_1 = require("../../../util/lists/styles");
const basic_object_1 = require("./basic-object");
/** Renderer of the warning document object */
class DocumentObjectWarningRenderer extends basic_object_1.BasicObjectRenderer {
    constructor() {
        super(...arguments);
        this.abstractVariant = 'warning';
        /** @override */
        this.title = 'Warning';
        /** @override */
        this.hasOptionalMetaTitle = true;
        /** @override */
        this.titleBackgroundColor = styles_1.InfoBlockColors.Orange;
    }
}
exports.DocumentObjectWarningRenderer = DocumentObjectWarningRenderer;
