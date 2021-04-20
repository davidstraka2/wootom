import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';

export class OuterEnvCodeblockRenderer implements Renderer {
    readonly kind: WooElementKind = 'OuterEnv';
    readonly abstractVariant = 'codeblock';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.append(renderingManager.render(...astNode.children));
        pre.append(code);
        return pre;
    }
}
