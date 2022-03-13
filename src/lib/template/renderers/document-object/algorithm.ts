import {Renderer} from '../../../core/rendering/renderer';
import {InfoBlockColors} from '../../../util/lists/styles';
import {BasicObjectRenderer} from './basic-object';

/** Renderer of the algorithm document object */
export class DocumentObjectAlgorithmRenderer
    extends BasicObjectRenderer
    implements Renderer {
    readonly abstractVariant = 'algorithm';

    /** @override */
    protected title = 'Algorithm';
    /** @override */
    protected hasOptionalMetaTitle = true;
    /** @override */
    protected titleBackgroundColor = InfoBlockColors.Blue;
}
