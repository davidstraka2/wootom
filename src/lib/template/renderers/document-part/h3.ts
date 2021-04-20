import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';

export class DocumentPartH3Renderer implements Renderer {
    readonly kind: WooElementKind = 'DocumentPart';
    readonly abstractVariant = 'h3';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const h = document.createElement('h3');
        h.append(renderingManager.render(...astNode.children));
        return h;
    }
}
