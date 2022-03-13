import { Renderer } from '../../../core/rendering/renderer';
import { BasicObjectRenderer } from './basic-object';
/** Renderer of the solution document object */
export declare class DocumentObjectSolutionRenderer extends BasicObjectRenderer implements Renderer {
    readonly abstractVariant = "solution";
    /** @override */
    protected title: string;
    /** @override */
    protected hasOptionalMetaTitle: boolean;
}
