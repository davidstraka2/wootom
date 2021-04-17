import {ASTNode} from './ast-node';

/** An ASTNode which has a variant */
export interface VariableASTNode extends ASTNode {
    /** The variant of the node */
    readonly variant: string;
}
