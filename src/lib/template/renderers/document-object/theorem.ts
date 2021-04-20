import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {infoBlockComponent} from '../../../util/html-components/info-block';
import {WooElementKind} from '../../../util/types/woo';

export class DocumentObjectTheoremRenderer implements Renderer {
    readonly kind: WooElementKind = 'DocumentObject';
    readonly abstractVariant = 'theorem';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        let title = 'Theorem';
        const titleMetadata = astNode.getMetadata('title');
        if (typeof titleMetadata === 'string') title += `: ${titleMetadata}`;
        return infoBlockComponent({
            title,
            children: [renderingManager.render(...astNode.children)],
        });
    }
}
