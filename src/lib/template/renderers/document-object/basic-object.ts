import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {infoBlockComponent} from '../../../util/html-components/info-block';
import {WooElementKind} from '../../../util/types/woo';

/** Partially implemented renderer for the most comon document objects */
export abstract class BasicObjectRenderer
    implements Pick<Required<Renderer>, 'render' | 'kind'> {
    readonly kind: WooElementKind = 'DocumentObject';

    /** The title of the document object */
    protected abstract title: string;
    /**
     * Whether the document object can optionally have the title metablock item
     */
    protected hasOptionalMetaTitle = false;

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        return infoBlockComponent({
            title: this.customizeTitle(this.title, astNode),
            children: [renderingManager.render(...astNode.children)],
        });
    }

    /**
     * Customize the title of the document object by appending the contents of
     * the optional title metablock item, if applicable.
     *
     * @param title The title to customize
     * @param astNode The AST node of the document object
     * @returns The customized title
     */
    protected customizeTitle(title: string, astNode: ASTNode): string {
        return this.appendMetaTitle(title, astNode);
    }

    private appendMetaTitle(title: string, astNode: ASTNode): string {
        if (!this.hasOptionalMetaTitle) return title;
        const titleMetadata = astNode.getMetadata('title');
        if (typeof titleMetadata === 'string') title += `: ${titleMetadata}`;
        return title;
    }
}
