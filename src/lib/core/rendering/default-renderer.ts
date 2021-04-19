import {errorBlockComponent} from '../../util/html-components/error-block';
import {ASTNode} from '../ast/ast-node';
import {VariableASTNode} from '../ast/variable-ast-node';
import {Renderer} from './renderer';
import {RenderingManager} from './rendering-manager';

export class DefaultRenderer implements Renderer {
    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        let message = `Unknown element of kind "${astNode.kind}"`;
        if (astNode instanceof VariableASTNode)
            message += `, variant "${astNode.variant}"`;
        return errorBlockComponent({
            title: message,
            children: [renderingManager.render(...astNode.children)],
        });
    }
}
