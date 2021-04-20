import { ASTNode } from '../../../core/ast/ast-node';
import { Renderer } from '../../../core/rendering/renderer';
import { RenderingManager } from '../../../core/rendering/rendering-manager';
import { WooElementKind } from '../../../util/types/woo';
export declare class OuterEnvSageRenderer implements Renderer {
    readonly kind: WooElementKind;
    readonly abstractVariant = "sage";
    render(renderingManager: RenderingManager, astNode: ASTNode): Node;
}
