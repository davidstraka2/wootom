import { ASTNode } from '../../../core/ast/ast-node';
import { Renderer } from '../../../core/rendering/renderer';
import { RenderingManager } from '../../../core/rendering/rendering-manager';
import { WooElementKind } from '../../../util/types/woo';
/** Renderer of the inline-math inner environment */
export declare class InnerEnvInlineMathRenderer implements Renderer {
    readonly kind: WooElementKind;
    readonly abstractVariant = "inline-math";
    render(renderingManager: RenderingManager, astNode: ASTNode): Node;
}
