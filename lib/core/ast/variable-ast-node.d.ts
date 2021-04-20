import { JSONMap } from '../../util/types/json';
import { ASTNode } from './ast-node';
/** An ASTNode which has a variant */
export declare abstract class VariableASTNode extends ASTNode {
    /** The variant of the node */
    abstract variant: string;
    toJSON(): JSONMap;
}
