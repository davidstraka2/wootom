import { ASTNode } from '../../../core/ast/ast-node';
import { Renderer } from '../../../core/rendering/renderer';
import { InfoBlockColors } from '../../../util/lists/styles';
import { BasicObjectRenderer } from './basic-object';
/** Renderer of the example document object */
export declare class DocumentObjectExampleRenderer extends BasicObjectRenderer implements Renderer {
    readonly abstractVariant = "example";
    /** @override */
    protected title: string;
    /** @override */
    protected hasOptionalMetaTitle: boolean;
    /** @override */
    protected titleBackgroundColor: InfoBlockColors;
    protected customizeTitle(title: string, astNode: ASTNode): string;
    private starTitle;
}
