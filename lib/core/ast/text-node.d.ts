import { JSONMap } from '../../util/types/json';
import { ASTNode } from './ast-node';
import { ASTNodePosition } from './ast-node-position';
import { ValueASTNode } from './value-ast-node';
/** An value containing ASTNode representing text */
export declare class TextNode extends ASTNode implements ValueASTNode<string> {
    readonly value: string;
    readonly isFragile: boolean;
    readonly parent?: ASTNode | undefined;
    readonly kind = "TextNode";
    /**
     * @param value The text value of the node
     * @param isFragile Whether the node is fragile (`true` if it is)
     * @param start The position of the start of the node
     * @param parent The parent node of the node
     */
    constructor(value: string, isFragile: boolean, start: ASTNodePosition, parent?: ASTNode | undefined);
    addChildren(...children: ASTNode[]): this;
    toJSON(): JSONMap;
}
