import { Renderer } from '../../../core/rendering/renderer';
import { InfoBlockColors } from '../../../util/lists/styles';
import { BasicObjectRenderer } from './basic-object';
/** Renderer of the remark document object */
export declare class DocumentObjectRemarkRenderer extends BasicObjectRenderer implements Renderer {
    readonly abstractVariant = "remark";
    /** @override */
    protected title: string;
    /** @override */
    protected hasOptionalMetaTitle: boolean;
    /** @override */
    protected titleBackgroundColor: InfoBlockColors;
}
