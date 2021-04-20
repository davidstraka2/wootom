import { ASTNode } from '../ast/ast-node';
import { Renderer } from './renderer';
import { RenderingManager } from './rendering-manager';
export declare class DefaultRenderer implements Renderer {
    render(renderingManager: RenderingManager, astNode: ASTNode): Node;
}
