import { ASTNode } from '../../../core/ast/ast-node';
import { Renderer } from '../../../core/rendering/renderer';
import { RenderingManager } from '../../../core/rendering/rendering-manager';
import { WooElementKind } from '../../../util/types/woo';
export declare class OuterEnvEnumerateRenderer implements Renderer {
    readonly kind: WooElementKind;
    readonly abstractVariant = "enumerate";
    render(renderingManager: RenderingManager, astNode: ASTNode): Node;
}
