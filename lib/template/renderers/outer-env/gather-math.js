"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OuterEnvGatherMathRenderer = void 0;
const mathjax_1 = require("../../mathjax");
/** Renderer of the gather-math outer environment */
class OuterEnvGatherMathRenderer {
    constructor() {
        this.kind = 'OuterEnv';
        this.abstractVariant = 'gather-math';
    }
    render(renderingManager, astNode) {
        var _a;
        const children = renderingManager.render(...astNode.children);
        const mathSource = `\\begin{gather*}${(_a = children.textContent) !== null && _a !== void 0 ? _a : ''}\\end{gather*}`;
        return mathjax_1.typesetBlockMath(mathSource);
    }
}
exports.OuterEnvGatherMathRenderer = OuterEnvGatherMathRenderer;
