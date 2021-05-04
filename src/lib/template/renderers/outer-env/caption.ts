import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';

/** Renderer of the caption outer environment */
export class OuterEnvCaptionRenderer implements Renderer {
    readonly kind: WooElementKind = 'OuterEnv';
    readonly abstractVariant = 'caption';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const container = document.createElement('div');
        container.append(renderingManager.render(...astNode.children));
        container.classList.add('wootom-caption');
        return container;
    }
}
