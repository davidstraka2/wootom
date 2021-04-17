import {ASTNode} from './ast-node';
import {ASTNodePosition} from './ast-node-position';

/** An ASTNode representing the root of the WooWoo document */
export class DocumentRoot extends ASTNode {
    readonly kind = 'DocumentRoot';
    readonly isFragile = false;
    readonly parent = undefined;

    /** @param end The position of the end of the document */
    constructor(end: ASTNodePosition) {
        super(
            {
                line: 1,
                column: 1,
                offset: 0,
            },
            end,
        );
    }
}
