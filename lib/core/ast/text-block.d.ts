import { ASTNode } from './ast-node';
import { ASTNodePosition } from './ast-node-position';
/** An ASTNode representing a text block */
export declare class TextBlock extends ASTNode {
    readonly isFragile: boolean;
    readonly parent?: ASTNode | undefined;
    readonly kind = "TextBlock";
    /**
     * @param isFragile Whether the node is fragile (`true` if it is)
     * @param start The position of the start of the node
     * @param end The position of the end of the node
     * @param parent The parent node of the node
     */
    constructor(isFragile: boolean, start: ASTNodePosition, end: ASTNodePosition, parent?: ASTNode | undefined);
}
