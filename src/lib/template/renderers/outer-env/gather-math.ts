import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';
import {typesetBlockMath} from '../../mathjax';

/** Renderer of the gather-math outer environment */
export class OuterEnvGatherMathRenderer implements Renderer {
    readonly kind: WooElementKind = 'OuterEnv';
    readonly abstractVariant = 'gather-math';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const children = renderingManager.render(...astNode.children);
        const mathSource = `\\begin{gather*}${
            children.textContent ?? ''
        }\\end{gather*}`;
        return typesetBlockMath(mathSource);
    }
}
