"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnerEnvInlineMathRenderer = void 0;
const mathjax_1 = require("../../mathjax");
class InnerEnvInlineMathRenderer {
    constructor() {
        this.kind = 'InnerEnv';
        this.abstractVariant = 'inline-math';
    }
    render(renderingManager, astNode) {
        var _a;
        const span = document.createElement('span');
        const children = renderingManager.render(...astNode.children);
        const math = document.createElement('script');
        math.type = 'math/tex';
        math.innerHTML = (_a = children.textContent) !== null && _a !== void 0 ? _a : '';
        span.appendChild(math);
        mathjax_1.typesetMath([math]);
        return span;
    }
}
exports.InnerEnvInlineMathRenderer = InnerEnvInlineMathRenderer;
