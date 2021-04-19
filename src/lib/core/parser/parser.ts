import {parse as parseYAML} from 'yaml';
import {Stack} from '../../util/containers/stack';
import {horizontalWhitespace} from '../../util/regex-patterns/charsets';
import {eol} from '../../util/regex-patterns/sequences';
import {
    getEndingNewline,
    trimEndingNewline,
    trimIndentation,
} from '../../util/text/multiline';
import {WooElementKind} from '../../util/types/woo';
import {ASTNode} from '../ast/ast-node';
import {ASTNodePosition} from '../ast/ast-node-position';
import {DocumentObject} from '../ast/document-object';
import {DocumentPart} from '../ast/document-part';
import {DocumentRoot} from '../ast/document-root';
import {IndentedBlock} from '../ast/indented-block';
import {InlineMath} from '../ast/inline-math';
import {InnerEnv} from '../ast/inner-env';
import {OuterEnv} from '../ast/outer-env';
import {TextBlock} from '../ast/text-block';
import {TextNode} from '../ast/text-node';
import {Match} from './matchers/match';
import {Matcher} from './matchers/matcher';
import {PairMatcher} from './matchers/pair-matcher';
import {SimpleMatcher} from './matchers/simple-matcher';
import * as regex from './regex-patterns/woo';

type ParseResult<T extends ASTNode> = {
    /** The parsed content */
    parsed: T;
    /** Non-parsed source remainder */
    after: string;
};

const metablockMatcher = new SimpleMatcher(
    new RegExp(`^${regex.yamlMetablock}`, 'm'),
);
const documentPartMatcher = new SimpleMatcher(new RegExp(regex.documentPart));
const documentObjectMatcher = new SimpleMatcher(
    new RegExp(regex.documentObject),
);
const outerEnvMatcher = new SimpleMatcher(new RegExp(regex.outerEnv));
const fragileOuterEnvMatcher = new SimpleMatcher(
    new RegExp(regex.fragileOuterEnv),
);
const textBlockSeparatorMatcher = new SimpleMatcher(
    new RegExp(`${eol}${horizontalWhitespace}*${eol}`),
);
const shortInnerEnvMatcher = new SimpleMatcher(new RegExp(regex.shortInnerEnv));
const verboseInnerEnvMatcher = new PairMatcher(
    /"/,
    new RegExp(regex.verboseInnerEnvEnd),
);
const verboseIndexInnerEnvMatcher = new PairMatcher(
    /"/,
    new RegExp(regex.verboseIndexInnerEnvEnd),
);
const inlineMathMatcher = new SimpleMatcher(new RegExp(regex.inlineMath));
const inlineCommentMatcher = new SimpleMatcher(/^\s*%.*/);

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
        this.parseBlockContent(start, root, source);
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
    ): void {
        const scope = new Stack<ASTNode>();
        let remainingSource = source;
        let prevRemainderLength;
        while (remainingSource.length > 0) {
            if (remainingSource.length === prevRemainderLength)
                throw new Error('Unknown error in parsing');
            prevRemainderLength = remainingSource.length;

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

            scope.popWhile(node => start.column <= node.startColumn);
            const realParent = scope.top ?? parent;

            if (!realParent.isFragile) {
                const match = inlineCommentMatcher.findFirstMatch(
                    remainingSource,
                );
                if (typeof match !== 'undefined' && match.index === 0) {
                    remainingSource = match.after;
                    start = ASTNodePosition.getEnd(start, match.matched);
                    continue;
                }
            }

            const unscoped: WooElementKind[] = [
                'DocumentPart',
                'IndentedBlock',
                'TextBlock',
            ];
            const parsingSteps = [
                this.parseFragileOuterEnvContent.bind(this),
                this.parseDocumentPart.bind(this),
                this.parseDocumentObject.bind(this),
                this.parseFragileOuterEnv.bind(this),
                this.parseOuterEnv.bind(this),
                this.parseIndentedBlock.bind(this),
                this.parseTextBlock.bind(this),
            ];
            for (const parsingStep of parsingSteps) {
                const parsingResult = parsingStep(
                    start,
                    realParent,
                    remainingSource,
                );
                if (typeof parsingResult !== 'undefined') {
                    const {parsed, after} = parsingResult;
                    if (!unscoped.includes(parsed.kind)) scope.push(parsed);
                    realParent.addChildren(parsed);
                    remainingSource = after;
                    start = parsed.end;
                    break;
                }
            }
        }
    }

    /**
     * Parse inline content of a block
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
    ): void {
        const contents: (ASTNode | string)[] = [];
        const lines = source.split('\n').map(line => `${line}\n`);
        const lastLine = lines.pop();
        if (typeof lastLine !== 'undefined') lines.push(lastLine.slice(0, -1));
        let lineStart = start;
        lines.forEach(line => {
            contents.push(...this.parseLineContent(lineStart, parent, line));
            lineStart = ASTNodePosition.getEnd(lineStart, line);
            const indentation = parent.startColumn - lineStart.column;
            lineStart.column += indentation;
            lineStart.offset += indentation;
        });
        if (contents.length === 0) return;
        const compactedContents = [];
        let lastContent = contents[0];
        compactedContents.push(lastContent);
        for (let i = 1; i < contents.length; i++) {
            const currentContent = contents[i];
            if (
                typeof lastContent === 'string' &&
                typeof currentContent === 'string'
            ) {
                compactedContents.pop();
                lastContent = `${lastContent}${currentContent}`;
            } else {
                lastContent = currentContent;
            }
            compactedContents.push(lastContent);
        }
        for (let i = 0; i < compactedContents.length; i++) {
            const currentContent = compactedContents[i];
            const siblingIndex = parent.children.length;
            const currentStart =
                siblingIndex > 0
                    ? parent.children[siblingIndex - 1].end
                    : start;
            if (typeof currentContent === 'string') {
                parent.addChildren(
                    this.parseTextNode(currentStart, parent, currentContent),
                );
            } else {
                parent.addChildren(currentContent);
            }
        }
    }

    parseLineContent(
        start: ASTNodePosition,
        parent: ASTNode,
        source: string,
    ): (ASTNode | string)[] {
        start = new ASTNodePosition(start);
        const contents = [];
        let lineRemainder = source;
        while (lineRemainder.length > 0) {
            const inlineMathMatch = inlineMathMatcher.findFirstMatch(
                lineRemainder,
            );
            const shortInnerEnvMatch = shortInnerEnvMatcher.findFirstMatch(
                lineRemainder,
            );
            const verboseIndexInnerEnvMatch = verboseIndexInnerEnvMatcher.findFirstMatch(
                lineRemainder,
            );
            const verboseInnerEnvMatch = verboseInnerEnvMatcher.findFirstMatch(
                lineRemainder,
            );
            if (inlineMathMatch?.index === 0) {
                if (typeof inlineMathMatch.groups[0] === 'undefined')
                    throw new Error('Unknown error in parsing.');
                const end = ASTNodePosition.getEnd(
                    start,
                    inlineMathMatch.matched,
                );
                const inlineMath = new InlineMath(true, start, end, parent);
                inlineMath.addChildren(
                    new TextNode(
                        inlineMathMatch.groups[0],
                        true,
                        ASTNodePosition.getEnd(start, '$'),
                        inlineMath,
                    ),
                );
                contents.push(inlineMath);
                start = end;
                lineRemainder = inlineMathMatch.after;
            } else if (shortInnerEnvMatch?.index === 0) {
                if (
                    typeof shortInnerEnvMatch.groups[0] === 'undefined' ||
                    typeof shortInnerEnvMatch.groups[1] === 'undefined' ||
                    typeof shortInnerEnvMatch.groups[2] === 'undefined'
                ) {
                    throw new Error('Unknown error in parsing.');
                }
                const end = ASTNodePosition.getEnd(
                    start,
                    shortInnerEnvMatch.matched,
                );
                const innerEnv = new InnerEnv(
                    shortInnerEnvMatch.groups[1],
                    false,
                    start,
                    end,
                    parent,
                );
                innerEnv.addChildren(
                    new TextNode(
                        shortInnerEnvMatch.groups[2],
                        false,
                        ASTNodePosition.getEnd(
                            start,
                            shortInnerEnvMatch.groups[0],
                        ),
                        innerEnv,
                    ),
                );
                contents.push(innerEnv);
                start = end;
                lineRemainder = shortInnerEnvMatch.after;
            } else if (verboseIndexInnerEnvMatch?.index === 0) {
                if (
                    typeof verboseIndexInnerEnvMatch.groups[0] ===
                        'undefined' ||
                    typeof verboseIndexInnerEnvMatch.groups[1] === 'undefined'
                ) {
                    throw new Error('Unknown error in parsing.');
                }
                const end = ASTNodePosition.getEnd(
                    start,
                    verboseIndexInnerEnvMatch.matched,
                );
                const innerEnv = new InnerEnv(
                    '_index',
                    false,
                    start,
                    end,
                    parent,
                );
                const innerStart = ASTNodePosition.getEnd(start, '"');
                innerEnv.setMetadata(
                    '_index',
                    verboseIndexInnerEnvMatch.groups[1],
                );
                this.parseInlineContent(
                    innerStart,
                    innerEnv,
                    verboseIndexInnerEnvMatch.groups[0],
                );
                contents.push(innerEnv);
                start = end;
                lineRemainder = verboseIndexInnerEnvMatch.after;
            } else if (verboseInnerEnvMatch?.index === 0) {
                if (
                    typeof verboseInnerEnvMatch.groups[0] === 'undefined' ||
                    typeof verboseInnerEnvMatch.groups[1] === 'undefined' ||
                    typeof verboseInnerEnvMatch.groups[2] === 'undefined'
                ) {
                    throw new Error('Unknown error in parsing.');
                }
                const end = ASTNodePosition.getEnd(
                    start,
                    verboseInnerEnvMatch.matched,
                );
                let variant = verboseInnerEnvMatch.groups[2];
                if (verboseInnerEnvMatch.groups[1] === '#')
                    variant = '_reference';
                const innerEnv = new InnerEnv(
                    variant,
                    false,
                    start,
                    end,
                    parent,
                );
                if (verboseInnerEnvMatch.groups[1] === '#')
                    innerEnv.setMetadata(
                        '_reference',
                        verboseInnerEnvMatch.groups[2],
                    );
                if (typeof verboseInnerEnvMatch.groups[3] !== 'undefined')
                    innerEnv.setMetadata(
                        '_index',
                        verboseInnerEnvMatch.groups[3],
                    );
                const innerStart = ASTNodePosition.getEnd(start, '"');
                this.parseInlineContent(
                    innerStart,
                    innerEnv,
                    verboseInnerEnvMatch.groups[0],
                );
                contents.push(innerEnv);
                start = end;
                lineRemainder = verboseInnerEnvMatch.after;
            } else {
                const matches = [
                    inlineMathMatch,
                    shortInnerEnvMatch,
                    verboseIndexInnerEnvMatch,
                    verboseInnerEnvMatch,
                ].filter(match => typeof match !== 'undefined') as Match[];
                if (matches.length > 0) {
                    matches.sort((a, b) => a.index - b.index);
                    const nearestMatch = matches[0];
                    lineRemainder = lineRemainder.slice(
                        nearestMatch.before.length,
                    );
                    start = ASTNodePosition.getEnd(start, nearestMatch.before);
                    contents.push(nearestMatch.before);
                } else {
                    contents.push(lineRemainder);
                    lineRemainder = '';
                }
            }
        }
        return contents;
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
        const match = documentPartMatcher.findFirstMatch(source);
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
        this.parseInlineContent(
            titleStart,
            documentPart,
            trimEndingNewline(title),
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
     * Parse a document object
     *
     * @param start The position of the start of the document object
     * @param parent The parent node of the document object
     * @param source The source of the document object to be parsed
     * @returns A new document object along with the non-parsed source
     * remainder; or `undefined` if no document object could be parsed
     */
    private parseDocumentObject(
        start: ASTNodePosition,
        parent: ASTNode,
        source: string,
    ): ParseResult<DocumentObject> | undefined {
        return this.parseDocumentObjectOrOuterEnv(
            start,
            parent,
            source,
            documentObjectMatcher,
            DocumentObject,
        );
    }

    /**
     * Parse an outer environment
     *
     * @param start The position of the start of the outer environment
     * @param parent The parent node of the outer environment
     * @param source The source of the outer environment to be parsed
     * @returns A new outer environment along with the non-parsed source
     * remainder; or `undefined` if no outer environment could be parsed
     */
    private parseOuterEnv(
        start: ASTNodePosition,
        parent: ASTNode,
        source: string,
    ): ParseResult<OuterEnv> | undefined {
        return this.parseDocumentObjectOrOuterEnv(
            start,
            parent,
            source,
            outerEnvMatcher,
            OuterEnv,
        );
    }

    private parseDocumentObjectOrOuterEnv<T extends ASTNode>(
        start: ASTNodePosition,
        parent: ASTNode,
        source: string,
        matcher: Matcher,
        NodeConstructor: new (
            variant: string,
            isFragile: boolean,
            start: ASTNodePosition,
            end: ASTNodePosition,
            parent?: ASTNode,
        ) => T,
    ): ParseResult<T> | undefined {
        const match = matcher.findFirstMatch(source);
        if (typeof match === 'undefined' || match.index !== 0) {
            return;
        }
        const [variant, metablock] = match.groups;
        if (typeof variant === 'undefined')
            throw new Error('Unknown error in parsing.');
        const end = ASTNodePosition.getEnd(
            start,
            trimEndingNewline(match.matched),
        );
        const node = new NodeConstructor(variant, false, start, end, parent);
        const metadata = this.parseMetablock(metablock);
        Object.keys(metadata).forEach(key =>
            node.setMetadata(key, metadata[key]),
        );
        return {
            parsed: node,
            after: `${getEndingNewline(match.matched)}${match.after}`,
        };
    }

    /**
     * Parse a fragile outer environment
     *
     * @param start The position of the start of the fragile outer environment
     * @param parent The parent node of the fragile outer environment
     * @param source The source of the fragile outer environment to be parsed
     * @returns A new fragile outer environment along with the non-parsed source
     * remainder; or `undefined` if no fragile outer environment could be parsed
     */
    private parseFragileOuterEnv(
        start: ASTNodePosition,
        parent: ASTNode,
        source: string,
    ): ParseResult<OuterEnv> | undefined {
        const match = fragileOuterEnvMatcher.findFirstMatch(source);
        if (typeof match === 'undefined' || match.index !== 0) {
            return;
        }
        const [variant, metablock] = match.groups;
        if (typeof variant === 'undefined')
            throw new Error('Unknown error in parsing.');
        const end = ASTNodePosition.getEnd(
            start,
            trimEndingNewline(match.matched),
        );
        const node = new OuterEnv(variant, true, start, end, parent);
        const metadata = this.parseMetablock(metablock);
        Object.keys(metadata).forEach(key =>
            node.setMetadata(key, metadata[key]),
        );
        return {
            parsed: node,
            after: `${getEndingNewline(match.matched)}${match.after}`,
        };
    }

    /**
     * Parse the content of a fragile outer environment
     *
     * @param start The position of the start of the content
     * @param parent The parent node of the content
     * @param source The source of the content to be parsed
     * @returns A new text node along with the non-parsed source remainder
     */
    private parseFragileOuterEnvContent(
        start: ASTNodePosition,
        parent: ASTNode,
        source: string,
    ): ParseResult<TextBlock> | undefined {
        if (!parent.isFragile) return;
        const match = textBlockSeparatorMatcher.findFirstMatch(source);
        const {before, after} = match ?? {before: source, after: ''};
        const end = ASTNodePosition.getEnd(start, before);
        const content = trimIndentation(before, start.column - 1);
        const textBlock = new TextBlock(true, start, end, parent);
        textBlock.addChildren(new TextNode(content, true, start, textBlock));
        return {
            parsed: textBlock,
            after: `${match?.matched ?? ''}${after}`,
        };
    }

    /**
     * Parse an indented block
     *
     * @param start The position of the start of the indented block
     * @param parent The parent node of the indented block
     * @param source The source of the indented block to be parsed
     * @returns A new indented block along with the non-parsed source remainder
     */
    private parseIndentedBlock(
        start: ASTNodePosition,
        parent: ASTNode,
        source: string,
    ): ParseResult<IndentedBlock> | undefined {
        if (
            parent.children.length === 0 ||
            start.column <= parent.children[0].startColumn
        ) {
            return;
        }
        const match = textBlockSeparatorMatcher.findFirstMatch(source);
        const {before, after} = match ?? {before: source, after: ''};
        const end = ASTNodePosition.getEnd(start, before);
        let content = trimIndentation(before, start.column - 1);
        const metablockMatch = metablockMatcher.findFirstMatch(content);
        const metablock = metablockMatch?.matched ?? '';
        if (metablock.length > 0)
            content = trimEndingNewline(content.slice(0, -metablock.length));
        const indentedBlock = new IndentedBlock(false, start, end, parent);
        const metadata = this.parseMetablock(metablock);
        Object.keys(metadata).forEach(key =>
            indentedBlock.setMetadata(key, metadata[key]),
        );
        this.parseInlineContent(start, indentedBlock, content);
        return {
            parsed: indentedBlock,
            after: `${match?.matched ?? ''}${after}`,
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
        const match = textBlockSeparatorMatcher.findFirstMatch(source);
        const {before, after} = match ?? {before: source, after: ''};
        const end = ASTNodePosition.getEnd(start, before);
        let content = trimIndentation(before, start.column - 1);
        const metablockMatch = metablockMatcher.findFirstMatch(content);
        const metablock = metablockMatch?.matched ?? '';
        if (metablock.length > 0)
            content = trimEndingNewline(content.slice(0, -metablock.length));
        const textBlock = new TextBlock(false, start, end, parent);
        const metadata = this.parseMetablock(metablock);
        Object.keys(metadata).forEach(key =>
            textBlock.setMetadata(key, metadata[key]),
        );
        this.parseInlineContent(start, textBlock, content);
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
