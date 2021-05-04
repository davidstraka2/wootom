import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';
import {typesetBlockMath} from '../../mathjax';

/** Renderer of the extra-indented block element */
export class IndentedBlockRenderer implements Renderer {
    readonly kind: WooElementKind = 'IndentedBlock';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const children = renderingManager.render(...astNode.children);
        const mathSource = children.textContent ?? '';
        return typesetBlockMath(mathSource);
    }
}
