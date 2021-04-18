import {ASTNode} from './ast-node';
import {ASTNodePosition} from './ast-node-position';

/** An ASTNode representing an indented block */
export class IndentedBlock extends ASTNode {
    readonly kind = 'IndentedBlock';

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
