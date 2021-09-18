import {Renderer} from '../../../core/rendering/renderer';
import {BasicObjectRenderer} from './basic-object';

/** Renderer of the corollary document object */
export class DocumentObjectCorollaryRenderer
    extends BasicObjectRenderer
    implements Renderer {
    readonly abstractVariant = 'corollary';

    /** @override */
    protected title = 'Corollary';
    /** @override */
    protected hasOptionalMetaTitle = true;
}
