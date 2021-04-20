"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASTNodePosition = void 0;
const multiline_1 = require("../../util/text/multiline");
/** The position of an ASTNode relative to the source document */
class ASTNodePosition {
    constructor(lineOrSource, column, offset) {
        if (typeof lineOrSource === 'object') {
            this.line = lineOrSource.line;
            this.column = lineOrSource.column;
            this.offset = lineOrSource.offset;
        }
        else {
            this.line = lineOrSource;
            this.column = column;
            this.offset = offset;
        }
    }
    /**
     * Get the position of the end of a text
     *
     * @param start The position of the start of the input text
     * @param value The input text
     * @returns The position of the end of the input text
     */
    static getEnd(start, value) {
        const linecount = multiline_1.countLines(value);
        const end = new ASTNodePosition(start);
        end.offset += value.length;
        if (linecount > 1) {
            const lastLine = multiline_1.getLastLine(value);
            end.column = 1 + lastLine.length;
            end.line += linecount - 1;
        }
        else {
            end.column += value.length;
        }
        return end;
    }
}
exports.ASTNodePosition = ASTNodePosition;
