import { ASTNode } from '../../../core/ast/ast-node';
import { Renderer } from '../../../core/rendering/renderer';
import { RenderingManager } from '../../../core/rendering/rendering-manager';
import { WooElementKind } from '../../../util/types/woo';
/** Partially implemented renderer for the most comon document objects */
export declare abstract class BasicObjectRenderer implements Pick<Required<Renderer>, 'render' | 'kind'> {
    readonly kind: WooElementKind;
    /** The title of the document object */
    protected abstract title: string;
    /**
     * Whether the document object can optionally have the title metablock item
     */
    protected hasOptionalMetaTitle: boolean;
    protected titleBackgroundColor?: string;
    render(renderingManager: RenderingManager, astNode: ASTNode): Node;
    /**
     * Customize the title of the document object by appending the contents of
     * the optional title metablock item, if applicable.
     *
     * @param title The title to customize
     * @param astNode The AST node of the document object
     * @returns The customized title
     */
    protected customizeTitle(title: string, astNode: ASTNode): string;
    private appendMetaTitle;
}
