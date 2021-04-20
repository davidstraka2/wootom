import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';

export class InnerEnvQuotedRenderer implements Renderer {
    readonly kind: WooElementKind = 'InnerEnv';
    readonly abstractVariant = 'quoted';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const fragment = document.createDocumentFragment();
        fragment.append('„');
        fragment.append(renderingManager.render(...astNode.children));
        fragment.append('“');
        return fragment;
    }
}
