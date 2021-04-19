import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';

export class DocumentRootRenderer implements Renderer {
    readonly kind: WooElementKind = 'DocumentRoot';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        return renderingManager.render(...astNode.children);
    }
}
