import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {infoBlockComponent} from '../../../util/html-components/info-block';
import {WooElementKind} from '../../../util/types/woo';
import {typesetInlineMath} from '../../mathjax';

/** Renderer of the question document object */
export class DocumentObjectQuestionRenderer implements Renderer {
    readonly kind: WooElementKind = 'DocumentObject';
    readonly abstractVariant = 'question';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const children = [renderingManager.render(...astNode.children)];
        const solution = this.renderSolution(astNode);
        if (typeof solution !== 'undefined') children.push(solution);
        return infoBlockComponent({
            title: 'Question',
            children,
        });
    }

    private renderSolution(astNode: ASTNode): Node | undefined {
        const solution = astNode.getMetadata('solution');
        if (typeof solution !== 'string') return;
        const p = document.createElement('p');
        p.append(...this.parseAndTypesetSolution(solution));
        return infoBlockComponent({
            title: 'Question solution',
            children: [p],
        });
    }

    private parseAndTypesetSolution(solution: string): (string | Node)[] {
        return solution.split('$').map((part, index) => {
            if (index % 2 === 0) return part;
            return typesetInlineMath(part);
        });
    }
}
