import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {infoBlockComponent} from '../../../util/html-components/info-block';
import {WooElementKind} from '../../../util/types/woo';

export class OuterEnvSolutionRenderer implements Renderer {
    readonly kind: WooElementKind = 'OuterEnv';
    readonly abstractVariant = 'solution';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        return infoBlockComponent({
            title: 'Solution',
            children: [renderingManager.render(...astNode.children)],
        });
    }
}
