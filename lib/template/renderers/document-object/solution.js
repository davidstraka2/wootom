"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentObjectSolutionRenderer = void 0;
const basic_object_1 = require("./basic-object");
/** Renderer of the solution document object */
class DocumentObjectSolutionRenderer extends basic_object_1.BasicObjectRenderer {
    constructor() {
        super(...arguments);
        this.abstractVariant = 'solution';
        /** @override */
        this.title = 'Solution';
        /** @override */
        this.hasOptionalMetaTitle = true;
    }
}
exports.DocumentObjectSolutionRenderer = DocumentObjectSolutionRenderer;
