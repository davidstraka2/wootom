import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';

/** Renderer of the cite inner environment */
export class InnerEnvCiteRenderer implements Renderer {
    readonly kind: WooElementKind = 'InnerEnv';
    readonly abstractVariant = 'cite';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const cite = document.createElement('cite');
        cite.append('[', renderingManager.render(...astNode.children), ']');
        return cite;
    }
}
