import {Renderer} from '../../../core/rendering/renderer';
import {BasicObjectRenderer} from './basic-object';

/** Renderer of the lemma document object */
export class DocumentObjectLemmaRenderer
    extends BasicObjectRenderer
    implements Renderer {
    readonly abstractVariant = 'lemma';

    /** @override */
    protected title = 'Lemma';
    /** @override */
    protected hasOptionalMetaTitle = true;
}
