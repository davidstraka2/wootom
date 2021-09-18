import {Renderer} from '../../../core/rendering/renderer';
import {BasicObjectRenderer} from './basic-object';

/** Renderer of the observation document object */
export class DocumentObjectObservationRenderer
    extends BasicObjectRenderer
    implements Renderer {
    readonly abstractVariant = 'observation';

    /** @override */
    protected title = 'Observation';
    /** @override */
    protected hasOptionalMetaTitle = true;
}
