"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentObjectRemarkRenderer = void 0;
const styles_1 = require("../../../util/lists/styles");
const basic_object_1 = require("./basic-object");
/** Renderer of the remark document object */
class DocumentObjectRemarkRenderer extends basic_object_1.BasicObjectRenderer {
    constructor() {
        super(...arguments);
        this.abstractVariant = 'remark';
        /** @override */
        this.title = 'Remark';
        /** @override */
        this.hasOptionalMetaTitle = true;
        /** @override */
        this.titleBackgroundColor = styles_1.InfoBlockColors.Orange;
    }
}
exports.DocumentObjectRemarkRenderer = DocumentObjectRemarkRenderer;
