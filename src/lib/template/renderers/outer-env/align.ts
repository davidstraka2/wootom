import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';

export class OuterEnvAlignMathRenderer implements Renderer {
    readonly kind: WooElementKind = 'OuterEnv';
    readonly abstractVariant = 'align-math';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const pre = document.createElement('pre');
        pre.append('$$');
        pre.append('\\begin{align*}');
        pre.append(renderingManager.render(...astNode.children));
        pre.append('\\end{align*}');
        pre.append('$$');
        return pre;
    }
}
