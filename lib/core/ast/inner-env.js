"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnerEnv = void 0;
const variable_ast_node_1 = require("./variable-ast-node");
/** A variable ASTNode representing an inner environment */
class InnerEnv extends variable_ast_node_1.VariableASTNode {
    /**
     * @param variant The variant of the node
     * @param isFragile Whether the node is fragile (`true` if it is)
     * @param start The position of the start of the node
     * @param end The position of the end of the node
     * @param parent The parent node of the node
     */
    constructor(variant, isFragile, start, end, parent) {
        super(start, end);
        this.variant = variant;
        this.isFragile = isFragile;
        this.parent = parent;
        this.kind = 'InnerEnv';
    }
}
exports.InnerEnv = InnerEnv;
