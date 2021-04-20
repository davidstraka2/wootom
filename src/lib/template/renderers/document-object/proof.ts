import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {infoBlockComponent} from '../../../util/html-components/info-block';
import {WooElementKind} from '../../../util/types/woo';

export class DocumentObjectProofRenderer implements Renderer {
    readonly kind: WooElementKind = 'DocumentObject';
    readonly abstractVariant = 'proof';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        let title = 'Proof';
        const titleMetadata = astNode.getMetadata('title');
        if (typeof titleMetadata === 'string') title += `: ${titleMetadata}`;
        return infoBlockComponent({
            title,
            children: [renderingManager.render(...astNode.children)],
        });
    }
}
