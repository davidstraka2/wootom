import { ASTNode } from '../../../core/ast/ast-node';
import { Renderer } from '../../../core/rendering/renderer';
import { RenderingManager } from '../../../core/rendering/rendering-manager';
import { WooElementKind } from '../../../util/types/woo';
export declare class DocumentPartH3Renderer implements Renderer {
    readonly kind: WooElementKind;
    readonly abstractVariant = "h3";
    render(renderingManager: RenderingManager, astNode: ASTNode): Node;
}