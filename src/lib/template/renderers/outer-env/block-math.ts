import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';

export class OuterEnvBlockMathRenderer implements Renderer {
    readonly kind: WooElementKind = 'OuterEnv';
    readonly abstractVariant = 'block-math';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const pre = document.createElement('pre');
        pre.append('$$');
        pre.append(renderingManager.render(...astNode.children));
        pre.append('$$');
        return pre;
    }
}
