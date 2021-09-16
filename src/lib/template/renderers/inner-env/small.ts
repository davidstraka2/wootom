import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';

/** Renderer of the small inner environment */
export class InnerEnvSmallRenderer implements Renderer {
    readonly kind: WooElementKind = 'InnerEnv';
    readonly abstractVariant = 'small';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const small = document.createElement('small');
        small.append(renderingManager.render(...astNode.children));
        return small;
    }
}
