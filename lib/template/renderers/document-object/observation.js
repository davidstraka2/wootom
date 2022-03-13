"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentObjectObservationRenderer = void 0;
const styles_1 = require("../../../util/lists/styles");
const basic_object_1 = require("./basic-object");
/** Renderer of the observation document object */
class DocumentObjectObservationRenderer extends basic_object_1.BasicObjectRenderer {
    constructor() {
        super(...arguments);
        this.abstractVariant = 'observation';
        /** @override */
        this.title = 'Observation';
        /** @override */
        this.hasOptionalMetaTitle = true;
        /** @override */
        this.titleBackgroundColor = styles_1.InfoBlockColors.Orange;
    }
}
exports.DocumentObjectObservationRenderer = DocumentObjectObservationRenderer;
