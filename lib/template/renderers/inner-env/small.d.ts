import { ASTNode } from '../../../core/ast/ast-node';
import { Renderer } from '../../../core/rendering/renderer';
import { RenderingManager } from '../../../core/rendering/rendering-manager';
import { WooElementKind } from '../../../util/types/woo';
/** Renderer of the small inner environment */
export declare class InnerEnvSmallRenderer implements Renderer {
    readonly kind: WooElementKind;
    readonly abstractVariant = "small";
    render(renderingManager: RenderingManager, astNode: ASTNode): Node;
}
