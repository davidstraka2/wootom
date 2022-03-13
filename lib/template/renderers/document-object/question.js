"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentObjectQuestionRenderer = void 0;
const info_block_1 = require("../../../util/html-components/info-block");
const mathjax_1 = require("../../mathjax");
/** Renderer of the question document object */
class DocumentObjectQuestionRenderer {
    constructor() {
        this.kind = 'DocumentObject';
        this.abstractVariant = 'question';
    }
    render(renderingManager, astNode) {
        const children = [renderingManager.render(...astNode.children)];
        const solution = this.renderSolution(astNode);
        if (typeof solution !== 'undefined')
            children.push(solution);
        return info_block_1.infoBlockComponent({
            title: 'Question',
            children,
        });
    }
    renderSolution(astNode) {
        const solution = astNode.getMetadata('solution');
        if (typeof solution !== 'string')
            return;
        const p = document.createElement('p');
        p.append(...this.parseAndTypesetSolution(solution));
        return info_block_1.infoBlockComponent({
            title: 'Question solution',
            children: [p],
        });
    }
    parseAndTypesetSolution(solution) {
        return solution.split('$').map((part, index) => {
            if (index % 2 === 0)
                return part;
            return mathjax_1.typesetInlineMath(part);
        });
    }
}
exports.DocumentObjectQuestionRenderer = DocumentObjectQuestionRenderer;
