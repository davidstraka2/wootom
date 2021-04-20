import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';

export class DocumentPartH2Renderer implements Renderer {
    readonly kind: WooElementKind = 'DocumentPart';
    readonly abstractVariant = 'h2';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const h = document.createElement('h2');
        h.append(renderingManager.render(...astNode.children));
        return h;
    }
}
