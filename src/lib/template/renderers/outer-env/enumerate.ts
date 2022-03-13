import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';

export class OuterEnvEnumerateRenderer implements Renderer {
    readonly kind: WooElementKind = 'OuterEnv';
    readonly abstractVariant = 'enumerate';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const enumerate = document.createElement('ol');
        enumerate.append(renderingManager.render(...astNode.children));
        return enumerate;
    }
}
