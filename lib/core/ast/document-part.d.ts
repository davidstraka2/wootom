import { ASTNode } from './ast-node';
import { ASTNodePosition } from './ast-node-position';
import { VariableASTNode } from './variable-ast-node';
/** A variable ASTNode representing a document part */
export declare class DocumentPart extends VariableASTNode {
    readonly variant: string;
    readonly parent?: ASTNode | undefined;
    readonly kind = "DocumentPart";
    readonly isFragile = false;
    /**
     * @param variant The variant of the node
     * @param start The position of the start of the node
     * @param end The position of the end of the node
     * @param parent The parent node of the node
     */
    constructor(variant: string, start: ASTNodePosition, end: ASTNodePosition, parent?: ASTNode | undefined);
}
