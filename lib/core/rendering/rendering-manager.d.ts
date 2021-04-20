import { ASTNode } from '../ast/ast-node';
import { RendererRegistry } from './renderer-registry';
import { VariantRegistry } from './variant-registry';
export declare class RenderingManager {
    private readonly rendererRegistry;
    private readonly variantRegistry;
    constructor(rendererRegistry: Required<RendererRegistry>, variantRegistry: Required<VariantRegistry>);
    render<T extends ASTNode>(...astNodes: T[]): Node;
}
