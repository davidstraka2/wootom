"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultRenderer = void 0;
const error_block_1 = require("../../util/html-components/error-block");
const variable_ast_node_1 = require("../ast/variable-ast-node");
class DefaultRenderer {
    render(renderingManager, astNode) {
        let message = `Unknown element of kind "${astNode.kind}"`;
        if (astNode instanceof variable_ast_node_1.VariableASTNode)
            message += `, variant "${astNode.variant}"`;
        return error_block_1.errorBlockComponent({
            title: message,
            children: [renderingManager.render(...astNode.children)],
        });
    }
}
exports.DefaultRenderer = DefaultRenderer;
