import { JSONMap } from '../../util/types/json';
import { WooElementKind } from '../../util/types/woo';
import { ASTNodePosition } from './ast-node-position';
/** A node of an abstract syntax tree representing a WooWoo document */
export declare abstract class ASTNode {
    /** The kind/type of the node */
    abstract kind: WooElementKind;
    /** Whether the node is fragile (`true` if it is) */
    abstract isFragile: boolean;
    /** The parent node of the node */
    abstract parent?: ASTNode;
    /**
     * The line/row position of the start of the node relative to the source
     * document (indexed from 1)
     */
    readonly startLine: number;
    /**
     * The column position of the start of the node relative to the source
     * document (indexed from 1)
     */
    readonly startColumn: number;
    /**
     * The offset/character position of the start of the node relative to the
     * source document (indexed from 0)
     */
    readonly startOffset: number;
    /**
     * The line/row position of the end of the node relative to the source
     * document (indexed from 1)
     */
    readonly endLine: number;
    /**
     * The column position of the end of the node relative to the source
     * document (indexed from 1)
     */
    readonly endColumn: number;
    /**
     * The offset/character position of the start of the node relative to the
     * source document (indexed from 0)
     */
    readonly endOffset: number;
    /** The child nodes of the node */
    private _children;
    /** The metadata items of the node */
    private metadata;
    constructor(start: ASTNodePosition, end: ASTNodePosition);
    /** The children of this node */
    get children(): ASTNode[];
    /** The position of end of the node */
    get end(): ASTNodePosition;
    /** The position of start of the node */
    get start(): ASTNodePosition;
    /**
     * Add nodes as children of this node.
     *
     * The children are appended sequentially (so the first node given is also
     * the first to be appended) after any existing children.
     *
     * @param children The nodes to add as children of this node
     */
    addChildren(...children: ASTNode[]): this;
    /**
     * Retrieve a metadata item value by its key
     *
     * @param key The key of the item to be retrieved
     * @returns The retrieved item value
     */
    getMetadata(key: string): unknown;
    /**
     * Set a metadata item value by its key
     *
     * @param key The key of the item to be set
     * @param value The value of the item to be set
     */
    setMetadata(key: string, value: unknown): this;
    /**
     * Checks whether two nodes are equal (this is a deep comparison)
     *
     * @param otherASTNode The other node to check against
     * @returns Whether the two nodes are (deep) equal
     */
    equals(otherASTNode: ASTNode): boolean;
    /**
     * Get a valid JSON value representing the node
     *
     * @returns A JSON value representing the node
     */
    toJSON(): JSONMap;
}
