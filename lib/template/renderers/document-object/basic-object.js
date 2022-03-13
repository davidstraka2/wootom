"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicObjectRenderer = void 0;
const info_block_1 = require("../../../util/html-components/info-block");
/** Partially implemented renderer for the most comon document objects */
class BasicObjectRenderer {
    constructor() {
        this.kind = 'DocumentObject';
        /**
         * Whether the document object can optionally have the title metablock item
         */
        this.hasOptionalMetaTitle = false;
    }
    render(renderingManager, astNode) {
        return info_block_1.infoBlockComponent({
            title: this.customizeTitle(this.title, astNode),
            children: [renderingManager.render(...astNode.children)],
            titleBackgroundColor: this.titleBackgroundColor,
        });
    }
    /**
     * Customize the title of the document object by appending the contents of
     * the optional title metablock item, if applicable.
     *
     * @param title The title to customize
     * @param astNode The AST node of the document object
     * @returns The customized title
     */
    customizeTitle(title, astNode) {
        return this.appendMetaTitle(title, astNode);
    }
    appendMetaTitle(title, astNode) {
        if (!this.hasOptionalMetaTitle)
            return title;
        const titleMetadata = astNode.getMetadata('title');
        if (typeof titleMetadata === 'string')
            title += `: ${titleMetadata}`;
        return title;
    }
}
exports.BasicObjectRenderer = BasicObjectRenderer;
