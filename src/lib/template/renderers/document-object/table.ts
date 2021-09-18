import {Renderer} from '../../../core/rendering/renderer';
import {BasicObjectRenderer} from './basic-object';

/** Renderer of the table document object */
export class DocumentObjectTableRenderer
    extends BasicObjectRenderer
    implements Renderer {
    readonly abstractVariant = 'table';

    /** @override */
    protected title = 'Table';
    /** @override */
    protected hasOptionalMetaTitle = true;
}
