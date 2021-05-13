import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';

/** Renderer of the reference inner environment */
export class InnerEnvReferenceRenderer implements Renderer {
    readonly kind: WooElementKind = 'InnerEnv';
    readonly abstractVariant = 'reference';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        return renderingManager.render(...astNode.children);
    }
}
