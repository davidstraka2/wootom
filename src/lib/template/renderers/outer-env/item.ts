import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';

export class OuterEnvItemRenderer implements Renderer {
    readonly kind: WooElementKind = 'OuterEnv';
    readonly abstractVariant = 'item';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const item = document.createElement('li');
        item.append(renderingManager.render(...astNode.children));
        return item;
    }
}
