"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentObjectFigureRenderer = void 0;
const info_block_1 = require("../../../util/html-components/info-block");
/** Renderer of the figure document object */
class DocumentObjectFigureRenderer {
    constructor() {
        this.kind = 'DocumentObject';
        this.abstractVariant = 'figure';
    }
    render(renderingManager, astNode) {
        const container = document.createElement('div');
        container.append(renderingManager.render(...astNode.children));
        container.classList.add('wootom-figure');
        return info_block_1.infoBlockComponent({
            title: 'Figure',
            children: [container],
        });
    }
}
exports.DocumentObjectFigureRenderer = DocumentObjectFigureRenderer;
