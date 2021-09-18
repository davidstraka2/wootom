import {Renderer} from '../../../core/rendering/renderer';
import {BasicObjectRenderer} from './basic-object';

/** Renderer of the definition document object */
export class DocumentObjectDefinitionRenderer
    extends BasicObjectRenderer
    implements Renderer {
    readonly abstractVariant = 'definition';

    /** @override */
    protected title = 'Definition';
    /** @override */
    protected hasOptionalMetaTitle = true;
}
