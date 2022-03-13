import {Renderer} from '../../../core/rendering/renderer';
import {InfoBlockColors} from '../../../util/lists/styles';
import {BasicObjectRenderer} from './basic-object';

/** Renderer of the theorem document object */
export class DocumentObjectTheoremRenderer
    extends BasicObjectRenderer
    implements Renderer {
    readonly abstractVariant = 'theorem';

    /** @override */
    protected title = 'Theorem';
    /** @override */
    protected hasOptionalMetaTitle = true;
    /** @override */
    protected titleBackgroundColor = InfoBlockColors.Blue;
}
