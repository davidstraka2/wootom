import { ASTNode } from '../../../core/ast/ast-node';
import { Renderer } from '../../../core/rendering/renderer';
import { RenderingManager } from '../../../core/rendering/rendering-manager';
import { WooElementKind } from '../../../util/types/woo';
/** Renderer of the extra-indented block element */
export declare class IndentedBlockRenderer implements Renderer {
    readonly kind: WooElementKind;
    render(renderingManager: RenderingManager, astNode: ASTNode): Node;
}