import { ASTNode } from '../../../core/ast/ast-node';
import { Renderer } from '../../../core/rendering/renderer';
import { RenderingManager } from '../../../core/rendering/rendering-manager';
import { WooElementKind } from '../../../util/types/woo';
/** Renderer of the inline math element */
export declare class InlineMathRenderer implements Renderer {
    readonly kind: WooElementKind;
    render(renderingManager: RenderingManager, astNode: ASTNode): Node;
}
