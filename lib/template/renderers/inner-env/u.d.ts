import { ASTNode } from '../../../core/ast/ast-node';
import { Renderer } from '../../../core/rendering/renderer';
import { RenderingManager } from '../../../core/rendering/rendering-manager';
import { WooElementKind } from '../../../util/types/woo';
/** Renderer of the u (unarticulated, underlined) inner environment */
export declare class InnerEnvURenderer implements Renderer {
    readonly kind: WooElementKind;
    readonly abstractVariant = "u";
    render(renderingManager: RenderingManager, astNode: ASTNode): Node;
}
