import {JSONMap} from '../../util/types/json';
import {ASTNode} from './ast-node';

/** An ASTNode which has a variant */
export abstract class VariableASTNode extends ASTNode {
    /** The variant of the node */
    abstract variant: string;

    toJSON(): JSONMap {
        const json = super.toJSON();
        json.variant = this.variant;
        return json;
    }
}
