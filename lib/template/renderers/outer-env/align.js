"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OuterEnvAlignMathRenderer = void 0;
const mathjax_1 = require("../../mathjax");
/** Renderer of the align-math outer environment */
class OuterEnvAlignMathRenderer {
    constructor() {
        this.kind = 'OuterEnv';
        this.abstractVariant = 'align-math';
    }
    render(renderingManager, astNode) {
        var _a;
        const children = renderingManager.render(...astNode.children);
        const mathSource = `\\begin{align*}${(_a = children.textContent) !== null && _a !== void 0 ? _a : ''}\\end{align*}`;
        return mathjax_1.typesetBlockMath(mathSource);
    }
}
exports.OuterEnvAlignMathRenderer = OuterEnvAlignMathRenderer;
