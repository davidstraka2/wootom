import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';

export class DocumentObjectFigureRenderer implements Renderer {
    readonly kind: WooElementKind = 'DocumentObject';
    readonly abstractVariant = 'figure';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const div = document.createElement('div');
        div.append(renderingManager.render(...astNode.children));
        return div;
    }
}
