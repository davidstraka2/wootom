"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineMathRenderer = void 0;
const mathjax_1 = require("../../mathjax");
/** Renderer of the inline math element */
class InlineMathRenderer {
    constructor() {
        this.kind = 'InlineMath';
    }
    render(renderingManager, astNode) {
        var _a;
        const children = renderingManager.render(...astNode.children);
        const mathSource = (_a = children.textContent) !== null && _a !== void 0 ? _a : '';
        return mathjax_1.typesetInlineMath(mathSource);
    }
}
exports.InlineMathRenderer = InlineMathRenderer;
