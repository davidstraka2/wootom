import {Renderer} from '../../../core/rendering/renderer';
import {BasicObjectRenderer} from './basic-object';

/** Renderer of the example document object */
export class DocumentObjectExampleRenderer
    extends BasicObjectRenderer
    implements Renderer {
    readonly abstractVariant = 'example';

    /** @override */
    protected title = 'Example';
    /** @override */
    protected hasOptionalMetaTitle = true;
}
