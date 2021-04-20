import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';
import {typesetMath} from '../../mathjax';

export class IndentedBlockRenderer implements Renderer {
    readonly kind: WooElementKind = 'IndentedBlock';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const div = document.createElement('div');
        const children = renderingManager.render(...astNode.children);
        const math = document.createElement('script');
        math.type = 'math/tex; mode=display';
        math.innerHTML = children.textContent ?? '';
        div.appendChild(math);
        typesetMath([math]);
        return div;
    }
}
