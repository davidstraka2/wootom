"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableASTNode = void 0;
const ast_node_1 = require("./ast-node");
/** An ASTNode which has a variant */
class VariableASTNode extends ast_node_1.ASTNode {
    toJSON() {
        const json = super.toJSON();
        json.variant = this.variant;
        return json;
    }
}
exports.VariableASTNode = VariableASTNode;
