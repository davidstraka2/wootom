import { ASTNode } from './ast-node';
/** An ASTNode which has a value */
export interface ValueASTNode<ValueType> extends ASTNode {
    /** The value of the node */
    readonly value: ValueType;
}
