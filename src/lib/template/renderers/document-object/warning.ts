import {Renderer} from '../../../core/rendering/renderer';
import {InfoBlockColors} from '../../../util/lists/styles';
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
    /** @override */
    protected titleBackgroundColor = InfoBlockColors.Orange;
}
