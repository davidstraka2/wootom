"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextNode = void 0;
const ast_node_1 = require("./ast-node");
const ast_node_position_1 = require("./ast-node-position");
/** An value containing ASTNode representing text */
class TextNode extends ast_node_1.ASTNode {
    /**
     * @param value The text value of the node
     * @param isFragile Whether the node is fragile (`true` if it is)
     * @param start The position of the start of the node
     * @param parent The parent node of the node
     */
    constructor(value, isFragile, start, parent) {
        super(start, ast_node_position_1.ASTNodePosition.getEnd(start, value));
        this.value = value;
        this.isFragile = isFragile;
        this.parent = parent;
        this.kind = 'TextNode';
    }
    addChildren(...children) {
        if (children.length > 0)
            throw new Error('Cannot add children to TextNode.');
        return this;
    }
    toJSON() {
        const json = super.toJSON();
        json.value = this.value;
        return json;
    }
}
exports.TextNode = TextNode;
