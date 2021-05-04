import { ASTNode } from '../../../core/ast/ast-node';
import { Renderer } from '../../../core/rendering/renderer';
import { RenderingManager } from '../../../core/rendering/rendering-manager';
import { WooElementKind } from '../../../util/types/woo';
/** Renderer of the figure document object */
export declare class DocumentObjectFigureRenderer implements Renderer {
    readonly kind: WooElementKind;
    readonly abstractVariant = "figure";
    render(renderingManager: RenderingManager, astNode: ASTNode): Node;
}
