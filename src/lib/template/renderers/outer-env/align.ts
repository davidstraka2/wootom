import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';
import {typesetBlockMath} from '../../mathjax';

/** Renderer of the align-math outer environment */
export class OuterEnvAlignMathRenderer implements Renderer {
    readonly kind: WooElementKind = 'OuterEnv';
    readonly abstractVariant = 'align-math';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const children = renderingManager.render(...astNode.children);
        const mathSource = `\\begin{align*}${
            children.textContent ?? ''
        }\\end{align*}`;
        return typesetBlockMath(mathSource);
    }
}
