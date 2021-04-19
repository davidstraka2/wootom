import {WooElementKind} from '../../util/types/woo';
import {ASTNode} from '../ast/ast-node';
import {RenderingManager} from './rendering-manager';

export interface Renderer {
    kind?: WooElementKind;
    abstractVariant?: string;

    render<T extends ASTNode>(
        renderingManager: RenderingManager,
        astNode: T,
    ): Node;
}
