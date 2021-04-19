import {ASTNode} from '../../../core/ast/ast-node';
import {TextNode} from '../../../core/ast/text-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';

export class TextNodeRenderer implements Renderer {
    readonly kind: WooElementKind = 'TextNode';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const textNode = astNode as TextNode;
        return document.createTextNode(textNode.value);
    }
}
