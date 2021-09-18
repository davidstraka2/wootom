import {Renderer} from '../../../core/rendering/renderer';
import {BasicObjectRenderer} from './basic-object';

/** Renderer of the warning document object */
export class DocumentObjectWarningRenderer
    extends BasicObjectRenderer
    implements Renderer {
    readonly abstractVariant = 'warning';

    /** @override */
    protected title = 'Warning';
    /** @override */
    protected hasOptionalMetaTitle = true;
}
