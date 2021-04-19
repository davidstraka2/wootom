import {JSONMap} from '../../util/types/json';
import {ASTNode} from './ast-node';
import {ASTNodePosition} from './ast-node-position';
import {VariableASTNode} from './variable-ast-node';

/** A variable ASTNode representing an inner environment */
export class InnerEnv extends ASTNode implements VariableASTNode {
    readonly kind = 'InnerEnv';

    /**
     * @param variant The variant of the node
     * @param isFragile Whether the node is fragile (`true` if it is)
     * @param start The position of the start of the node
     * @param end The position of the end of the node
     * @param parent The parent node of the node
     */
    constructor(
        readonly variant: string,
        readonly isFragile: boolean,
        start: ASTNodePosition,
        end: ASTNodePosition,
        readonly parent?: ASTNode,
    ) {
        super(start, end);
    }

    toJSON(): JSONMap {
        const json = super.toJSON();
        json.variant = this.variant;
        return json;
    }
}
