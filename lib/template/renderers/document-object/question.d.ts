import { ASTNode } from '../../../core/ast/ast-node';
import { Renderer } from '../../../core/rendering/renderer';
import { RenderingManager } from '../../../core/rendering/rendering-manager';
import { WooElementKind } from '../../../util/types/woo';
/** Renderer of the question document object */
export declare class DocumentObjectQuestionRenderer implements Renderer {
    readonly kind: WooElementKind;
    readonly abstractVariant = "question";
    render(renderingManager: RenderingManager, astNode: ASTNode): Node;
    private renderSolution;
    private parseAndTypesetSolution;
}
