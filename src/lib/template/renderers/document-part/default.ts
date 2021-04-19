import {ASTNode} from '../../../core/ast/ast-node';
import {DocumentPart} from '../../../core/ast/document-part';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {errorBlockComponent} from '../../../util/html-components/error-block';
import {WooElementKind} from '../../../util/types/woo';

export class DefaultDocumentPartRenderer implements Renderer {
    readonly kind: WooElementKind = 'DocumentPart';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const documentPart = astNode as DocumentPart;
        const message = `Unknown document part variant "${documentPart.variant}"`;
        return errorBlockComponent({
            title: message,
            children: [renderingManager.render(...documentPart.children)],
        });
    }
}
