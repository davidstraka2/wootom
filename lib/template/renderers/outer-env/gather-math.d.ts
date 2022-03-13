import { ASTNode } from '../../../core/ast/ast-node';
import { Renderer } from '../../../core/rendering/renderer';
import { RenderingManager } from '../../../core/rendering/rendering-manager';
import { WooElementKind } from '../../../util/types/woo';
/** Renderer of the gather-math outer environment */
export declare class OuterEnvGatherMathRenderer implements Renderer {
    readonly kind: WooElementKind;
    readonly abstractVariant = "gather-math";
    render(renderingManager: RenderingManager, astNode: ASTNode): Node;
}
