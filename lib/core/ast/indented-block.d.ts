import { ASTNode } from './ast-node';
import { ASTNodePosition } from './ast-node-position';
/** An ASTNode representing an indented block */
export declare class IndentedBlock extends ASTNode {
    readonly isFragile: boolean;
    readonly parent?: ASTNode | undefined;
    readonly kind = "IndentedBlock";
    /**
     * @param isFragile Whether the node is fragile (`true` if it is)
     * @param start The position of the start of the node
     * @param end The position of the end of the node
     * @param parent The parent node of the node
     */
    constructor(isFragile: boolean, start: ASTNodePosition, end: ASTNodePosition, parent?: ASTNode | undefined);
}
