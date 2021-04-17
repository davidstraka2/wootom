import {JSONMap} from '../../util/types/json';
import {ASTNode} from './ast-node';
import {ASTNodePosition} from './ast-node-position';
import {VariableASTNode} from './variable-ast-node';

/** A variable ASTNode representing a document part */
export class DocumentPart extends ASTNode implements VariableASTNode {
    readonly kind = 'DocumentPart';
    readonly isFragile = false;

    /**
     * @param variant The variant of the node
     * @param start The position of the start of the node
     * @param end The position of the end of the node
     * @param parent The parent node of the node
     */
    constructor(
        readonly variant: string,
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
