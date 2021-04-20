"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentRoot = void 0;
const ast_node_1 = require("./ast-node");
/** An ASTNode representing the root of the WooWoo document */
class DocumentRoot extends ast_node_1.ASTNode {
    /** @param end The position of the end of the document */
    constructor(end) {
        super({
            line: 1,
            column: 1,
            offset: 0,
        }, end);
        this.kind = 'DocumentRoot';
        this.isFragile = false;
        this.parent = undefined;
    }
}
exports.DocumentRoot = DocumentRoot;
