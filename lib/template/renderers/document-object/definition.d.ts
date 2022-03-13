import { Renderer } from '../../../core/rendering/renderer';
import { InfoBlockColors } from '../../../util/lists/styles';
import { BasicObjectRenderer } from './basic-object';
/** Renderer of the definition document object */
export declare class DocumentObjectDefinitionRenderer extends BasicObjectRenderer implements Renderer {
    readonly abstractVariant = "definition";
    /** @override */
    protected title: string;
    /** @override */
    protected hasOptionalMetaTitle: boolean;
    /** @override */
    protected titleBackgroundColor: InfoBlockColors;
}
