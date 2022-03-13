import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';

export class OuterEnvItemizeRenderer implements Renderer {
    readonly kind: WooElementKind = 'OuterEnv';
    readonly abstractVariant = 'itemize';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const itemize = document.createElement('ul');
        itemize.append(renderingManager.render(...astNode.children));
        return itemize;
    }
}
