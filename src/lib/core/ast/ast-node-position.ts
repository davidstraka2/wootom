import {countLines, getLastLine} from '../../util/text/multiline';

/** The position of an ASTNode relative to the source document */
export class ASTNodePosition {
    /**
     * Get the position of the end of a text
     *
     * @param start The position of the start of the input text
     * @param value The input text
     * @returns The position of the end of the input text
     */
    static getEnd(start: ASTNodePosition, value: string): ASTNodePosition {
        const linecount = countLines(value);
        const end = new ASTNodePosition(start);
        end.offset += value.length;
        if (linecount > 1) {
            const lastLine = getLastLine(value);
            end.column = 1 + lastLine.length;
            end.line += linecount - 1;
        } else {
            end.column += value.length;
        }
        return end;
    }

    /**
     * The line/row position relative to the source document (indexed from 1)
     */
    line: number;
    /** The column position relative to the source document, indexed from 1 */
    column: number;
    /**
     * The offset/character position relative to the source document, indexed
     * from 0
     */
    offset: number;

    /**
     * @param line The line/row position relative to the source document
     * (indexed from 1)
     * @param column The column position relative to the source document,
     * indexed from 1
     * @param offset The offset/character position relative to the source
     * document, indexed from 0
     */
    constructor(line: number, column: number, offset: number);
    /** @param source The source `ASTNodePosition` object to copy */
    constructor(source: ASTNodePosition);
    constructor(
        lineOrSource: number | ASTNodePosition,
        column?: number,
        offset?: number,
    ) {
        if (typeof lineOrSource === 'object') {
            this.line = lineOrSource.line;
            this.column = lineOrSource.column;
            this.offset = lineOrSource.offset;
        } else {
            this.line = lineOrSource;
            this.column = column as number;
            this.offset = offset as number;
        }
    }
}
