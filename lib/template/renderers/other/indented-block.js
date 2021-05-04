"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndentedBlockRenderer = void 0;
const mathjax_1 = require("../../mathjax");
/** Renderer of the extra-indented block element */
class IndentedBlockRenderer {
    constructor() {
        this.kind = 'IndentedBlock';
    }
    render(renderingManager, astNode) {
        var _a;
        const children = renderingManager.render(...astNode.children);
        const mathSource = (_a = children.textContent) !== null && _a !== void 0 ? _a : '';
        return mathjax_1.typesetBlockMath(mathSource);
    }
}
exports.IndentedBlockRenderer = IndentedBlockRenderer;
