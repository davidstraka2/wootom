import { ASTNode } from './ast-node';
import { ASTNodePosition } from './ast-node-position';
import { VariableASTNode } from './variable-ast-node';
/** A variable ASTNode representing an outer environment */
export declare class OuterEnv extends VariableASTNode {
    readonly variant: string;
    readonly isFragile: boolean;
    readonly parent?: ASTNode | undefined;
    readonly kind = "OuterEnv";
    /**
     * @param variant The variant of the node
     * @param isFragile Whether the node is fragile (`true` if it is)
     * @param start The position of the start of the node
     * @param end The position of the end of the node
     * @param parent The parent node of the node
     */
    constructor(variant: string, isFragile: boolean, start: ASTNodePosition, end: ASTNodePosition, parent?: ASTNode | undefined);
}
