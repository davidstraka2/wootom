import { ASTNode } from '../ast/ast-node';
import { ASTNodePosition } from '../ast/ast-node-position';
/** Parses a WooWoo document into a WooWoo AST */
export declare class Parser {
    /**
     * Parse a WooWoo document into a WooWoo AST
     *
     * @param source The source WooWoo document to be parsed
     * @returns The root node of the parsed AST
     */
    parse(source: string): ASTNode;
    /**
     * Parse block content
     *
     * @param start The position of the start of the block content
     * @param parent The parent node of the block content
     * @param source The source of the block content to be parsed
     * @returns An array of nodes parsed from the source (empty if nothing
     * could be parsed)
     */
    private parseBlockContent;
    /**
     * Parse inline content of a block
     *
     * @param start The position of the start of the inline content
     * @param parent The parent node of the inline content
     * @param source The source of the inline content to be parsed
     * @returns An array of nodes parsed from the source (empty if nothing
     * could be parsed)
     */
    private parseInlineContent;
    parseLineContent(start: ASTNodePosition, parent: ASTNode, source: string): (ASTNode | string)[];
    /**
     * Parse a YAML metablock
     *
     * @param source The source of the metablock to be parsed, or `undefined` if
     * there is no metablock source to parse
     * @returns The parsed metablock, or an empty object if the metablock source
     * isn't a valid metablock
     */
    private parseMetablock;
    /**
     * Parse a document part
     *
     * @param start The position of the start of the document part
     * @param parent The parent node of the document part
     * @param source The source of the document part to be parsed
     * @returns A new document part along with the non-parsed source remainder;
     * or `undefined` if no document part could be parsed
     */
    private parseDocumentPart;
    /**
     * Parse a document object
     *
     * @param start The position of the start of the document object
     * @param parent The parent node of the document object
     * @param source The source of the document object to be parsed
     * @returns A new document object along with the non-parsed source
     * remainder; or `undefined` if no document object could be parsed
     */
    private parseDocumentObject;
    /**
     * Parse an outer environment
     *
     * @param start The position of the start of the outer environment
     * @param parent The parent node of the outer environment
     * @param source The source of the outer environment to be parsed
     * @returns A new outer environment along with the non-parsed source
     * remainder; or `undefined` if no outer environment could be parsed
     */
    private parseOuterEnv;
    private parseDocumentObjectOrOuterEnv;
    /**
     * Parse a fragile outer environment
     *
     * @param start The position of the start of the fragile outer environment
     * @param parent The parent node of the fragile outer environment
     * @param source The source of the fragile outer environment to be parsed
     * @returns A new fragile outer environment along with the non-parsed source
     * remainder; or `undefined` if no fragile outer environment could be parsed
     */
    private parseFragileOuterEnv;
    /**
     * Parse the content of a fragile outer environment
     *
     * @param start The position of the start of the content
     * @param parent The parent node of the content
     * @param source The source of the content to be parsed
     * @returns A new text node along with the non-parsed source remainder
     */
    private parseFragileOuterEnvContent;
    /**
     * Parse an indented block
     *
     * @param start The position of the start of the indented block
     * @param parent The parent node of the indented block
     * @param source The source of the indented block to be parsed
     * @returns A new indented block along with the non-parsed source remainder
     */
    private parseIndentedBlock;
    /**
     * Parse a text block
     *
     * @param start The position of the start of the text block
     * @param parent The parent node of the text block
     * @param source The source of the text block to be parsed
     * @returns A new text block along with the non-parsed source remainder
     */
    private parseTextBlock;
    /**
     * Parse a text node
     *
     * @param start The position of the start of the text node
     * @param parent The parent node of the text node
     * @param source The source of the text node to be parsed
     * @returns A new text node
     */
    private parseTextNode;
}
