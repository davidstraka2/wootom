"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndentedBlockRenderer = void 0;
const mathjax_1 = require("../../mathjax");
class IndentedBlockRenderer {
    constructor() {
        this.kind = 'IndentedBlock';
    }
    render(renderingManager, astNode) {
        var _a;
        const div = document.createElement('div');
        const children = renderingManager.render(...astNode.children);
        const math = document.createElement('script');
        math.type = 'math/tex; mode=display';
        math.innerHTML = (_a = children.textContent) !== null && _a !== void 0 ? _a : '';
        div.appendChild(math);
        mathjax_1.typesetMath([math]);
        return div;
    }
}
exports.IndentedBlockRenderer = IndentedBlockRenderer;
