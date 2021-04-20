import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';
import {typesetMath} from '../../mathjax';

export class InnerEnvInlineMathRenderer implements Renderer {
    readonly kind: WooElementKind = 'InnerEnv';
    readonly abstractVariant = 'inline-math';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const span = document.createElement('span');
        const children = renderingManager.render(...astNode.children);
        const math = document.createElement('script');
        math.type = 'math/tex';
        math.innerHTML = children.textContent ?? '';
        span.appendChild(math);
        typesetMath([math]);
        return span;
    }
}
