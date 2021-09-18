import {Renderer} from '../../../core/rendering/renderer';
import {BasicObjectRenderer} from './basic-object';

/** Renderer of the remark document object */
export class DocumentObjectRemarkRenderer
    extends BasicObjectRenderer
    implements Renderer {
    readonly abstractVariant = 'remark';

    /** @override */
    protected title = 'Remark';
    /** @override */
    protected hasOptionalMetaTitle = true;
}
