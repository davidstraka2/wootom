"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderingManager = void 0;
const variable_ast_node_1 = require("../ast/variable-ast-node");
class RenderingManager {
    constructor(rendererRegistry, variantRegistry) {
        this.rendererRegistry = rendererRegistry;
        this.variantRegistry = variantRegistry;
    }
    render(...astNodes) {
        const fragment = document.createDocumentFragment();
        astNodes.forEach(node => {
            var _a;
            let renderer;
            if (node instanceof variable_ast_node_1.VariableASTNode) {
                const abstractVariant = (_a = this.variantRegistry.getAbstractVariant(node.kind, node.variant)) !== null && _a !== void 0 ? _a : '';
                renderer = this.rendererRegistry.getRenderer(node.kind, abstractVariant);
            }
            if (typeof renderer === 'undefined')
                renderer = this.rendererRegistry.getRenderer(node.kind);
            if (typeof renderer === 'undefined')
                renderer = this.rendererRegistry.getRenderer();
            fragment.append(renderer.render(this, node));
        });
        return fragment;
    }
}
exports.RenderingManager = RenderingManager;
