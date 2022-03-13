import { Renderer } from '../../../core/rendering/renderer';
import { InfoBlockColors } from '../../../util/lists/styles';
import { BasicObjectRenderer } from './basic-object';
/** Renderer of the proposition document object */
export declare class DocumentObjectPropositionRenderer extends BasicObjectRenderer implements Renderer {
    readonly abstractVariant = "proposition";
    /** @override */
    protected title: string;
    /** @override */
    protected hasOptionalMetaTitle: boolean;
    /** @override */
    protected titleBackgroundColor: InfoBlockColors;
}
