import { Renderer } from '../../../core/rendering/renderer';
import { InfoBlockColors } from '../../../util/lists/styles';
import { BasicObjectRenderer } from './basic-object';
/** Renderer of the observation document object */
export declare class DocumentObjectObservationRenderer extends BasicObjectRenderer implements Renderer {
    readonly abstractVariant = "observation";
    /** @override */
    protected title: string;
    /** @override */
    protected hasOptionalMetaTitle: boolean;
    /** @override */
    protected titleBackgroundColor: InfoBlockColors;
}
