import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';

export class InnerEnvBRenderer implements Renderer {
    readonly kind: WooElementKind = 'InnerEnv';
    readonly abstractVariant = 'b';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const strong = document.createElement('strong');
        strong.append(renderingManager.render(...astNode.children));
        return strong;
    }
}
