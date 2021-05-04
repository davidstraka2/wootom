import { ASTNode } from '../../../core/ast/ast-node';
import { Renderer } from '../../../core/rendering/renderer';
import { RenderingManager } from '../../../core/rendering/rendering-manager';
import { WooElementKind } from '../../../util/types/woo';
/** Renderer of the align-math outer environment */
export declare class OuterEnvAlignMathRenderer implements Renderer {
    readonly kind: WooElementKind;
    readonly abstractVariant = "align-math";
    render(renderingManager: RenderingManager, astNode: ASTNode): Node;
}
