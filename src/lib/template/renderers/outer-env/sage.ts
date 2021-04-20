import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {infoBlockComponent} from '../../../util/html-components/info-block';
import {WooElementKind} from '../../../util/types/woo';

export class OuterEnvSageRenderer implements Renderer {
    readonly kind: WooElementKind = 'OuterEnv';
    readonly abstractVariant = 'sage';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.append(renderingManager.render(...astNode.children));
        pre.append(code);
        return infoBlockComponent({
            title: 'Sage environment',
            children: [pre],
        });
    }
}
