/** The position of an ASTNode relative to the source document */
export declare class ASTNodePosition {
    /**
     * Get the position of the end of a text
     *
     * @param start The position of the start of the input text
     * @param value The input text
     * @returns The position of the end of the input text
     */
    static getEnd(start: ASTNodePosition, value: string): ASTNodePosition;
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
}
