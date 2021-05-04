import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';
import {typesetInlineMath} from '../../mathjax';

/** Renderer of the inline math element */
export class InlineMathRenderer implements Renderer {
    readonly kind: WooElementKind = 'InlineMath';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const children = renderingManager.render(...astNode.children);
        const mathSource = children.textContent ?? '';
        return typesetInlineMath(mathSource);
    }
}
