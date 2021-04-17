import {parse as parseYAML} from 'yaml';
import {eol} from '../../util/regex-patterns/sequences';
import {getEndingNewline, trimEndingNewline} from '../../util/text/multiline';
import {ASTNode} from '../ast/ast-node';
import {ASTNodePosition} from '../ast/ast-node-position';
import {DocumentPart} from '../ast/document-part';
import {DocumentRoot} from '../ast/document-root';
import {TextBlock} from '../ast/text-block';
import {TextNode} from '../ast/text-node';
import {SimpleMatcher} from './matchers/simple-matcher';
import * as regex from './regex-patterns/woo';

type ParseResult<T extends ASTNode> = {
    /** The parsed content */
    parsed: T;
    /** Non-parsed source remainder */
    after: string;
};

/** Parses a WooWoo document into a WooWoo AST */
export class Parser {
    /**
     * Parse a WooWoo document into a WooWoo AST
     *
     * @param source The source WooWoo document to be parsed
     * @returns The root node of the parsed AST
     */
    parse(source: string): ASTNode {
        const start = new ASTNodePosition(1, 1, 0);
        const root = new DocumentRoot(ASTNodePosition.getEnd(start, source));
        root.addChildren(...this.parseBlockContent(start, root, source));
        return root;
    }

    /**
     * Parse block content
     *
     * @param start The position of the start of the block content
     * @param parent The parent node of the block content
     * @param source The source of the block content to be parsed
     * @returns An array of nodes parsed from the source (empty if nothing
     * could be parsed)
     */
    private parseBlockContent(
        start: ASTNodePosition,
        parent: ASTNode,
        source: string,
    ): ASTNode[] {
        const content: ASTNode[] = [];
        let remainingSource = source;
        while (remainingSource.length > 0) {
            const trimmedRemainder = remainingSource.trimLeft();
            if (trimmedRemainder !== remainingSource) {
                const whitespaceTrimmed = remainingSource.slice(
                    0,
                    -trimmedRemainder.length,
                );
                remainingSource = trimmedRemainder;
                start = ASTNodePosition.getEnd(start, whitespaceTrimmed);
                continue;
            }
            const documentPart = this.parseDocumentPart(
                start,
                parent,
                remainingSource,
            );
            if (typeof documentPart !== 'undefined') {
                content.push(documentPart.parsed);
                remainingSource = documentPart.after;
                start = documentPart.parsed.end;
                continue;
            }
            const textBlock = this.parseTextBlock(
                start,
                parent,
                remainingSource,
            );
            content.push(textBlock.parsed);
            remainingSource = textBlock.after;
            start = textBlock.parsed.end;
        }
        return content;
    }

    /**
     * Parse inline content
     *
     * @param start The position of the start of the inline content
     * @param parent The parent node of the inline content
     * @param source The source of the inline content to be parsed
     * @returns An array of nodes parsed from the source (empty if nothing
     * could be parsed)
     */
    private parseInlineContent(
        start: ASTNodePosition,
        parent: ASTNode,
        source: string,
    ): ASTNode[] {
        return [this.parseTextNode(start, parent, source)];
    }

    /**
     * Parse a YAML metablock
     *
     * @param source The source of the metablock to be parsed, or `undefined` if
     * there is no metablock source to parse
     * @returns The parsed metablock, or an empty object if the metablock source
     * isn't a valid metablock
     */
    private parseMetablock(source?: string): Record<string, unknown> {
        if (typeof source === 'undefined') return {};
        const res = parseYAML(source) ?? {};
        if (typeof res !== 'object' || Array.isArray(res)) {
            return {};
        }
        return res;
    }

    /**
     * Parse a document part
     *
     * @param start The position of the start of the document part
     * @param parent The parent node of the document part
     * @param source The source of the document part to be parsed
     * @returns A new document part along with the non-parsed source remainder;
     * or `undefined` if no document part could be parsed
     */
    private parseDocumentPart(
        start: ASTNodePosition,
        parent: ASTNode,
        source: string,
    ): ParseResult<DocumentPart> | undefined {
        const matcher = new SimpleMatcher(new RegExp(regex.documentPart));
        const match = matcher.findFirstMatch(source);
        if (typeof match === 'undefined' || match.index !== 0) {
            return;
        }
        const [beforeTitle, variant, title, metablock] = match.groups;
        if (
            typeof beforeTitle === 'undefined' ||
            typeof variant === 'undefined' ||
            typeof title === 'undefined'
        ) {
            throw new Error('Unknown error in parsing.');
        }
        const end = ASTNodePosition.getEnd(
            start,
            trimEndingNewline(match.matched),
        );
        const documentPart = new DocumentPart(variant, start, end, parent);
        const titleStart = ASTNodePosition.getEnd(start, beforeTitle);
        documentPart.addChildren(
            ...this.parseInlineContent(
                titleStart,
                documentPart,
                trimEndingNewline(title),
            ),
        );
        const metadata = this.parseMetablock(metablock);
        Object.keys(metadata).forEach(key =>
            documentPart.setMetadata(key, metadata[key]),
        );
        return {
            parsed: documentPart,
            after: `${getEndingNewline(match.matched)}${match.after}`,
        };
    }

    /**
     * Parse a text block
     *
     * @param start The position of the start of the text block
     * @param parent The parent node of the text block
     * @param source The source of the text block to be parsed
     * @returns A new text block along with the non-parsed source remainder
     */
    private parseTextBlock(
        start: ASTNodePosition,
        parent: ASTNode,
        source: string,
    ): ParseResult<TextBlock> {
        const matcher = new SimpleMatcher(new RegExp(eol.repeat(2)));
        const match = matcher.findFirstMatch(source);
        const {before, after} = match ?? {before: source, after: ''};
        const end = ASTNodePosition.getEnd(start, before);
        const textBlock = new TextBlock(false, start, end, parent);
        textBlock.addChildren(
            ...this.parseInlineContent(start, textBlock, before),
        );
        return {parsed: textBlock, after: `${match?.matched ?? ''}${after}`};
    }

    /**
     * Parse a text node
     *
     * @param start The position of the start of the text node
     * @param parent The parent node of the text node
     * @param source The source of the text node to be parsed
     * @returns A new text node
     */
    private parseTextNode(
        start: ASTNodePosition,
        parent: ASTNode,
        source: string,
    ): TextNode {
        return new TextNode(source, false, start, parent);
    }
}
