"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnerEnvInlineMathRenderer = void 0;
const mathjax_1 = require("../../mathjax");
/** Renderer of the inline-math inner environment */
class InnerEnvInlineMathRenderer {
    constructor() {
        this.kind = 'InnerEnv';
        this.abstractVariant = 'inline-math';
    }
    render(renderingManager, astNode) {
        var _a;
        const children = renderingManager.render(...astNode.children);
        const mathSource = (_a = children.textContent) !== null && _a !== void 0 ? _a : '';
        return mathjax_1.typesetInlineMath(mathSource);
    }
}
exports.InnerEnvInlineMathRenderer = InnerEnvInlineMathRenderer;
