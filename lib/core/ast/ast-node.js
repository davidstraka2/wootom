"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASTNode = void 0;
const lodash_1 = require("lodash");
const ast_node_position_1 = require("./ast-node-position");
/** A node of an abstract syntax tree representing a WooWoo document */
class ASTNode {
    constructor(start, end) {
        /** The child nodes of the node */
        this._children = [];
        /** The metadata items of the node */
        this.metadata = {};
        this.startLine = start.line;
        this.startColumn = start.column;
        this.startOffset = start.offset;
        this.endLine = end.line;
        this.endColumn = end.column;
        this.endOffset = end.offset;
    }
    /** The children of this node */
    get children() {
        return this._children;
    }
    /** The position of end of the node */
    get end() {
        return new ast_node_position_1.ASTNodePosition(this.endLine, this.endColumn, this.endOffset);
    }
    /** The position of start of the node */
    get start() {
        return new ast_node_position_1.ASTNodePosition(this.startLine, this.startColumn, this.startOffset);
    }
    /**
     * Add nodes as children of this node.
     *
     * The children are appended sequentially (so the first node given is also
     * the first to be appended) after any existing children.
     *
     * @param children The nodes to add as children of this node
     */
    addChildren(...children) {
        this.children.push(...children);
        return this;
    }
    /**
     * Retrieve a metadata item value by its key
     *
     * @param key The key of the item to be retrieved
     * @returns The retrieved item value
     */
    getMetadata(key) {
        return this.metadata[key];
    }
    /**
     * Set a metadata item value by its key
     *
     * @param key The key of the item to be set
     * @param value The value of the item to be set
     */
    setMetadata(key, value) {
        this.metadata[key] = value;
        return this;
    }
    /**
     * Checks whether two nodes are equal (this is a deep comparison)
     *
     * @param otherASTNode The other node to check against
     * @returns Whether the two nodes are (deep) equal
     */
    equals(otherASTNode) {
        if (this === otherASTNode)
            return true;
        return lodash_1.isEqual(this.toJSON(), otherASTNode.toJSON());
    }
    /**
     * Get a valid JSON value representing the node
     *
     * @returns A JSON value representing the node
     */
    toJSON() {
        return {
            kind: this.kind,
            isFragile: this.isFragile,
            startLine: this.startLine,
            startColumn: this.startColumn,
            startOffset: this.startOffset,
            endLine: this.endLine,
            endColumn: this.endColumn,
            endOffset: this.endOffset,
            children: this.children.map(child => child.toJSON()),
            metadata: JSON.parse(JSON.stringify(this.metadata)),
        };
    }
}
exports.ASTNode = ASTNode;
