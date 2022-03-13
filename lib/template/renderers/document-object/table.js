"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentObjectTableRenderer = void 0;
const basic_object_1 = require("./basic-object");
/** Renderer of the table document object */
class DocumentObjectTableRenderer extends basic_object_1.BasicObjectRenderer {
    constructor() {
        super(...arguments);
        this.abstractVariant = 'table';
        /** @override */
        this.title = 'Table';
        /** @override */
        this.hasOptionalMetaTitle = true;
    }
}
exports.DocumentObjectTableRenderer = DocumentObjectTableRenderer;
