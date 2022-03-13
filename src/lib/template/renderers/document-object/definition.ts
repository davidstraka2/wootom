import {Renderer} from '../../../core/rendering/renderer';
import {InfoBlockColors} from '../../../util/lists/styles';
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
    /** @override */
    protected titleBackgroundColor = InfoBlockColors.Green;
}
