import {ASTNode} from '../../../core/ast/ast-node';
import {InnerEnv} from '../../../core/ast/inner-env';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';

export class DefaultInnerEnvRenderer implements Renderer {
    readonly kind: WooElementKind = 'InnerEnv';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const innerEnv = astNode as InnerEnv;
        const fragment = document.createDocumentFragment();
        const begin = document.createElement('span');
        begin.classList.add('wootom-error-inline');
        begin.append('Unknown inner environment "');
        fragment.append(begin);
        fragment.append(renderingManager.render(...innerEnv.children));
        const end = document.createElement('span');
        end.classList.add('wootom-error-inline');
        end.append(`".${innerEnv.variant}`);
        fragment.append(end);
        return fragment;
    }
}
