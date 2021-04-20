"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentPart = void 0;
const variable_ast_node_1 = require("./variable-ast-node");
/** A variable ASTNode representing a document part */
class DocumentPart extends variable_ast_node_1.VariableASTNode {
    /**
     * @param variant The variant of the node
     * @param start The position of the start of the node
     * @param end The position of the end of the node
     * @param parent The parent node of the node
     */
    constructor(variant, start, end, parent) {
        super(start, end);
        this.variant = variant;
        this.parent = parent;
        this.kind = 'DocumentPart';
        this.isFragile = false;
    }
}
exports.DocumentPart = DocumentPart;
