import { Renderer } from '../../../core/rendering/renderer';
import { BasicObjectRenderer } from './basic-object';
/** Renderer of the table document object */
export declare class DocumentObjectTableRenderer extends BasicObjectRenderer implements Renderer {
    readonly abstractVariant = "table";
    /** @override */
    protected title: string;
    /** @override */
    protected hasOptionalMetaTitle: boolean;
}
