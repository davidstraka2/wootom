import {ASTNode} from './ast-node';
import {ASTNodePosition} from './ast-node-position';

/** An ASTNode representing an inline math element */
export class InlineMath extends ASTNode {
    readonly kind = 'InlineMath';

    /**
     * @param isFragile Whether the node is fragile (`true` if it is)
     * @param start The position of the start of the node
     * @param end The position of the end of the node
     * @param parent The parent node of the node
     */
    constructor(
        readonly isFragile: boolean,
        start: ASTNodePosition,
        end: ASTNodePosition,
        readonly parent?: ASTNode,
    ) {
        super(start, end);
    }
}
