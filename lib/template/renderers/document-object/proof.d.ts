import { Renderer } from '../../../core/rendering/renderer';
import { BasicObjectRenderer } from './basic-object';
/** Renderer of the proof document object */
export declare class DocumentObjectProofRenderer extends BasicObjectRenderer implements Renderer {
    readonly abstractVariant = "proof";
    /** @override */
    protected title: string;
    /** @override */
    protected hasOptionalMetaTitle: boolean;
}
