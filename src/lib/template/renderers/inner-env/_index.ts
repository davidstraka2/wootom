import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';

export class InnerEnvIndexRenderer implements Renderer {
    readonly kind: WooElementKind = 'InnerEnv';
    readonly abstractVariant = '_index';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const index = astNode.getMetadata('_index');
        const children = renderingManager.render(...astNode.children);
        if (typeof index !== 'string') return children;
        let parent = astNode.parent;
        while (typeof parent !== 'undefined' && parent?.kind !== 'TextBlock') {
            parent = astNode.parent;
        }
        if (typeof parent === 'undefined') return children;
        const indexValue = parent.getMetadata(index);
        if (typeof indexValue !== 'object' && indexValue !== null)
            return children;
        const link = (indexValue as Record<string, unknown>)['link'];
        if (typeof link !== 'string') return children;
        const a = document.createElement('a');
        a.href = link;
        a.append(children);
        return a;
    }
}
