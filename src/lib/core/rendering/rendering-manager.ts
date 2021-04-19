import {ASTNode} from '../ast/ast-node';
import {VariableASTNode} from '../ast/variable-ast-node';
import {RendererRegistry} from './renderer-registry';
import {VariantRegistry} from './variant-registry';

export class RenderingManager {
    constructor(
        private readonly rendererRegistry: Required<RendererRegistry>,
        private readonly variantRegistry: Required<VariantRegistry>,
    ) {}

    render<T extends ASTNode>(...astNodes: T[]): Node {
        const fragment = document.createDocumentFragment();
        astNodes.forEach(node => {
            let renderer;
            if (node instanceof VariableASTNode) {
                const abstractVariant =
                    this.variantRegistry.getAbstractVariant(
                        node.kind,
                        node.variant,
                    ) ?? '';
                renderer = this.rendererRegistry.getRenderer(
                    node.kind,
                    abstractVariant,
                );
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
