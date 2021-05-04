import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {infoBlockComponent} from '../../../util/html-components/info-block';
import {WooElementKind} from '../../../util/types/woo';

/** Renderer of the figure document object */
export class DocumentObjectFigureRenderer implements Renderer {
    readonly kind: WooElementKind = 'DocumentObject';
    readonly abstractVariant = 'figure';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const container = document.createElement('div');
        container.append(renderingManager.render(...astNode.children));
        container.classList.add('wootom-figure');
        return infoBlockComponent({
            title: 'Figure',
            children: [container],
        });
    }
}
