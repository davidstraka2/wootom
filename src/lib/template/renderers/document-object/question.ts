import {Renderer} from '../../../core/rendering/renderer';
import {BasicObjectRenderer} from './basic-object';

/** Renderer of the question document object */
export class DocumentObjectQuestionRenderer
    extends BasicObjectRenderer
    implements Renderer {
    readonly abstractVariant = 'question';

    /** @override */
    protected title = 'Question';
    /** @override */
    protected hasOptionalMetaTitle = true;
}
