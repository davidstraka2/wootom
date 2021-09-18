import {ASTNode} from '../../../core/ast/ast-node';
import {DocumentObject} from '../../../core/ast/document-object';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {errorBlockComponent} from '../../../util/html-components/error-block';
import {WooElementKind} from '../../../util/types/woo';

/** Default renderer of document objects */
export class DefaultDocumentObjectRenderer implements Renderer {
    readonly kind: WooElementKind = 'DocumentObject';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const documentObject = astNode as DocumentObject;
        const message = `Unknown document object variant "${documentObject.variant}"`;
        return errorBlockComponent({
            title: message,
            children: [renderingManager.render(...documentObject.children)],
        });
    }
}
