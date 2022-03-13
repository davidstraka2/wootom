"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentObjectExampleRenderer = void 0;
const styles_1 = require("../../../util/lists/styles");
const basic_object_1 = require("./basic-object");
/** Renderer of the example document object */
class DocumentObjectExampleRenderer extends basic_object_1.BasicObjectRenderer {
    constructor() {
        super(...arguments);
        this.abstractVariant = 'example';
        /** @override */
        this.title = 'Example';
        /** @override */
        this.hasOptionalMetaTitle = true;
        /** @override */
        this.titleBackgroundColor = styles_1.InfoBlockColors.Orange;
    }
    customizeTitle(title, astNode) {
        title = this.starTitle(title, astNode);
        return super.customizeTitle(title, astNode);
    }
    starTitle(title, astNode) {
        const starMetadata = astNode.getMetadata('star');
        if (starMetadata === true)
            title = `⭐ ${title}`;
        return title;
    }
}
exports.DocumentObjectExampleRenderer = DocumentObjectExampleRenderer;
