"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineMath = void 0;
const ast_node_1 = require("./ast-node");
/** An ASTNode representing an inline math element */
class InlineMath extends ast_node_1.ASTNode {
    /**
     * @param isFragile Whether the node is fragile (`true` if it is)
     * @param start The position of the start of the node
     * @param end The position of the end of the node
     * @param parent The parent node of the node
     */
    constructor(isFragile, start, end, parent) {
        super(start, end);
        this.isFragile = isFragile;
        this.parent = parent;
        this.kind = 'InlineMath';
    }
}
exports.InlineMath = InlineMath;
