import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {BasicObjectRenderer} from './basic-object';

/** Renderer of the example document object */
export class DocumentObjectExampleRenderer
    extends BasicObjectRenderer
    implements Renderer {
    readonly abstractVariant = 'example';

    /** @override */
    protected title = 'Example';
    /** @override */
    protected hasOptionalMetaTitle = true;

    protected customizeTitle(title: string, astNode: ASTNode): string {
        title = this.starTitle(title, astNode);
        return super.customizeTitle(title, astNode);
    }

    private starTitle(title: string, astNode: ASTNode): string {
        const starMetadata = astNode.getMetadata('star');
        if (starMetadata === true) title = `⭐ ${title}`;
        return title;
    }
}
