import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';

export class OuterEnvQuoteRenderer implements Renderer {
    readonly kind: WooElementKind = 'OuterEnv';
    readonly abstractVariant = 'quote';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const blockquote = document.createElement('blockquote');
        blockquote.append(renderingManager.render(...astNode.children));
        const author = astNode.getMetadata('author');
        if (typeof author === 'string') {
            const cite = document.createElement('cite');
            const link = astNode.getMetadata('link');
            if (typeof link === 'string') {
                const a = document.createElement('a');
                a.href = link;
                a.append(author);
                cite.appendChild(a);
            } else {
                cite.append(author);
            }
            blockquote.append(cite);
        }
        return blockquote;
    }
}
