import {ASTNode} from '../../../core/ast/ast-node';
import {OuterEnv} from '../../../core/ast/outer-env';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {errorBlockComponent} from '../../../util/html-components/error-block';
import {WooElementKind} from '../../../util/types/woo';

export class DefaultOuterEnvRenderer implements Renderer {
    readonly kind: WooElementKind = 'OuterEnv';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const outerEnv = astNode as OuterEnv;
        const message = `Unknown outer environment variant "${outerEnv.variant}"`;
        return errorBlockComponent({
            title: message,
            children: [renderingManager.render(...outerEnv.children)],
        });
    }
}
