import {Renderer} from '../../../core/rendering/renderer';
import {InfoBlockColors} from '../../../util/lists/styles';
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
    /** @override */
    protected titleBackgroundColor = InfoBlockColors.Orange;
}
