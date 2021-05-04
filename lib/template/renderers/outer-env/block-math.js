"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OuterEnvBlockMathRenderer = void 0;
const mathjax_1 = require("../../mathjax");
/** Renderer of the block-math outer environment */
class OuterEnvBlockMathRenderer {
    constructor() {
        this.kind = 'OuterEnv';
        this.abstractVariant = 'block-math';
    }
    render(renderingManager, astNode) {
        var _a;
        const children = renderingManager.render(...astNode.children);
        const mathSource = (_a = children.textContent) !== null && _a !== void 0 ? _a : '';
        return mathjax_1.typesetBlockMath(mathSource);
    }
}
exports.OuterEnvBlockMathRenderer = OuterEnvBlockMathRenderer;
