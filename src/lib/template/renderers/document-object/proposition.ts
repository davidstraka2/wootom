import {Renderer} from '../../../core/rendering/renderer';
import {InfoBlockColors} from '../../../util/lists/styles';
import {BasicObjectRenderer} from './basic-object';

/** Renderer of the proposition document object */
export class DocumentObjectPropositionRenderer
    extends BasicObjectRenderer
    implements Renderer {
    readonly abstractVariant = 'proposition';

    /** @override */
    protected title = 'Proposition';
    /** @override */
    protected hasOptionalMetaTitle = true;
    /** @override */
    protected titleBackgroundColor = InfoBlockColors.Blue;
}
