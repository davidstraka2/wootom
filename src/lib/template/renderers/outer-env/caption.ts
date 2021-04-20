import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';

export class OuterEnvCaptionRenderer implements Renderer {
    readonly kind: WooElementKind = 'OuterEnv';
    readonly abstractVariant = 'caption';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const p = document.createElement('p');
        p.append(renderingManager.render(...astNode.children));
        return p;
    }
}
