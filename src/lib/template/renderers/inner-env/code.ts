import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';

export class InnerEnvCodeRenderer implements Renderer {
    readonly kind: WooElementKind = 'InnerEnv';
    readonly abstractVariant = 'code';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const code = document.createElement('code');
        code.append(renderingManager.render(...astNode.children));
        return code;
    }
}
