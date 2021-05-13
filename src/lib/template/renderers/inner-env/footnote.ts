import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';

/** Renderer of the footnote inner environment */
export class InnerEnvFootnoteRenderer implements Renderer {
    readonly kind: WooElementKind = 'InnerEnv';
    readonly abstractVariant = 'footnote';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const footnote = document.createElement('span');
        footnote.classList.add('wootom-footnote');
        const controls = document.createElement('span');
        controls.classList.add('wootom-footnote-controls');
        controls.addEventListener('click', () =>
            footnote.classList.toggle('wootom-footnote-shown'),
        );
        const content = document.createElement('span');
        content.append(renderingManager.render(...astNode.children));
        footnote.append(controls, content);
        return footnote;
    }
}
