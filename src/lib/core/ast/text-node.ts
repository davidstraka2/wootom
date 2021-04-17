import {JSONMap} from '../../util/types/json';
import {ASTNode} from './ast-node';
import {ASTNodePosition} from './ast-node-position';
import {ValueASTNode} from './value-ast-node';

/** An value containing ASTNode representing text */
export class TextNode extends ASTNode implements ValueASTNode<string> {
    readonly kind = 'TextNode';

    /**
     * @param value The text value of the node
     * @param isFragile Whether the node is fragile (`true` if it is)
     * @param start The position of the start of the node
     * @param parent The parent node of the node
     */
    constructor(
        readonly value: string,
        readonly isFragile: boolean,
        start: ASTNodePosition,
        readonly parent?: ASTNode,
    ) {
        super(start, ASTNodePosition.getEnd(start, value));
    }

    addChildren(...children: ASTNode[]): this {
        if (children.length > 0)
            throw new Error('Cannot add children to TextNode.');
        return this;
    }

    toJSON(): JSONMap {
        const json = super.toJSON();
        json.value = this.value;
        return json;
    }
}
