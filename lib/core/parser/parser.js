"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const yaml_1 = require("yaml");
const stack_1 = require("../../util/containers/stack");
const charsets_1 = require("../../util/regex-patterns/charsets");
const sequences_1 = require("../../util/regex-patterns/sequences");
const multiline_1 = require("../../util/text/multiline");
const ast_node_position_1 = require("../ast/ast-node-position");
const document_object_1 = require("../ast/document-object");
const document_part_1 = require("../ast/document-part");
const document_root_1 = require("../ast/document-root");
const indented_block_1 = require("../ast/indented-block");
const inline_math_1 = require("../ast/inline-math");
const inner_env_1 = require("../ast/inner-env");
const outer_env_1 = require("../ast/outer-env");
const text_block_1 = require("../ast/text-block");
const text_node_1 = require("../ast/text-node");
const pair_matcher_1 = require("./matchers/pair-matcher");
const simple_matcher_1 = require("./matchers/simple-matcher");
const regex = __importStar(require("./regex-patterns/woo"));
const metablockMatcher = new simple_matcher_1.SimpleMatcher(new RegExp(`^${regex.yamlMetablock}`, 'm'));
const documentPartMatcher = new simple_matcher_1.SimpleMatcher(new RegExp(regex.documentPart));
const documentObjectMatcher = new simple_matcher_1.SimpleMatcher(new RegExp(regex.documentObject));
const outerEnvMatcher = new simple_matcher_1.SimpleMatcher(new RegExp(regex.outerEnv));
const fragileOuterEnvMatcher = new simple_matcher_1.SimpleMatcher(new RegExp(regex.fragileOuterEnv));
const textBlockSeparatorMatcher = new simple_matcher_1.SimpleMatcher(new RegExp(`${sequences_1.eol}${charsets_1.horizontalWhitespace}*${sequences_1.eol}`));
const shortInnerEnvMatcher = new simple_matcher_1.SimpleMatcher(new RegExp(regex.shortInnerEnv));
const verboseInnerEnvMatcher = new pair_matcher_1.PairMatcher(/"/, new RegExp(regex.verboseInnerEnvEnd));
const verboseIndexInnerEnvMatcher = new pair_matcher_1.PairMatcher(/"/, new RegExp(regex.verboseIndexInnerEnvEnd));
const inlineMathMatcher = new simple_matcher_1.SimpleMatcher(new RegExp(regex.inlineMath));
const inlineCommentMatcher = new simple_matcher_1.SimpleMatcher(/^\s*%.*/);
/** Parses a WooWoo document into a WooWoo AST */
class Parser {
    /**
     * Parse a WooWoo document into a WooWoo AST
     *
     * @param source The source WooWoo document to be parsed
     * @returns The root node of the parsed AST
     */
    parse(source) {
        const start = new ast_node_position_1.ASTNodePosition(1, 1, 0);
        const root = new document_root_1.DocumentRoot(ast_node_position_1.ASTNodePosition.getEnd(start, source));
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
    parseBlockContent(start, parent, source) {
        var _a;
        const scope = new stack_1.Stack();
        let remainingSource = source;
        let prevRemainderLength;
        while (remainingSource.length > 0) {
            if (remainingSource.length === prevRemainderLength)
                throw new Error('Unknown error in parsing');
            prevRemainderLength = remainingSource.length;
            const trimmedRemainder = remainingSource.trimLeft();
            if (trimmedRemainder !== remainingSource) {
                const whitespaceTrimmed = remainingSource.slice(0, -trimmedRemainder.length);
                remainingSource = trimmedRemainder;
                start = ast_node_position_1.ASTNodePosition.getEnd(start, whitespaceTrimmed);
                continue;
            }
            scope.popWhile(node => start.column <= node.startColumn);
            const realParent = (_a = scope.top) !== null && _a !== void 0 ? _a : parent;
            if (!realParent.isFragile) {
                const match = inlineCommentMatcher.findFirstMatch(remainingSource);
                if (typeof match !== 'undefined' && match.index === 0) {
                    remainingSource = match.after;
                    start = ast_node_position_1.ASTNodePosition.getEnd(start, match.matched);
                    continue;
                }
            }
            const unscoped = [
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
                const parsingResult = parsingStep(start, realParent, remainingSource);
                if (typeof parsingResult !== 'undefined') {
                    const { parsed, after } = parsingResult;
                    if (!unscoped.includes(parsed.kind))
                        scope.push(parsed);
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
    parseInlineContent(start, parent, source) {
        const contents = [];
        const lines = source.split('\n').map(line => `${line}\n`);
        const lastLine = lines.pop();
        if (typeof lastLine !== 'undefined')
            lines.push(lastLine.slice(0, -1));
        let lineStart = start;
        lines.forEach(line => {
            contents.push(...this.parseLineContent(lineStart, parent, line));
            lineStart = ast_node_position_1.ASTNodePosition.getEnd(lineStart, line);
            const indentation = parent.startColumn - lineStart.column;
            lineStart.column += indentation;
            lineStart.offset += indentation;
        });
        if (contents.length === 0)
            return;
        const compactedContents = [];
        let lastContent = contents[0];
        compactedContents.push(lastContent);
        for (let i = 1; i < contents.length; i++) {
            const currentContent = contents[i];
            if (typeof lastContent === 'string' &&
                typeof currentContent === 'string') {
                compactedContents.pop();
                lastContent = `${lastContent}${currentContent}`;
            }
            else {
                lastContent = currentContent;
            }
            compactedContents.push(lastContent);
        }
        for (let i = 0; i < compactedContents.length; i++) {
            const currentContent = compactedContents[i];
            const siblingIndex = parent.children.length;
            const currentStart = siblingIndex > 0
                ? parent.children[siblingIndex - 1].end
                : start;
            if (typeof currentContent === 'string') {
                parent.addChildren(this.parseTextNode(currentStart, parent, currentContent));
            }
            else {
                parent.addChildren(currentContent);
            }
        }
    }
    parseLineContent(start, parent, source) {
        start = new ast_node_position_1.ASTNodePosition(start);
        const contents = [];
        let lineRemainder = source;
        while (lineRemainder.length > 0) {
            const inlineMathMatch = inlineMathMatcher.findFirstMatch(lineRemainder);
            const shortInnerEnvMatch = shortInnerEnvMatcher.findFirstMatch(lineRemainder);
            const verboseIndexInnerEnvMatch = verboseIndexInnerEnvMatcher.findFirstMatch(lineRemainder);
            const verboseInnerEnvMatch = verboseInnerEnvMatcher.findFirstMatch(lineRemainder);
            if ((inlineMathMatch === null || inlineMathMatch === void 0 ? void 0 : inlineMathMatch.index) === 0) {
                if (typeof inlineMathMatch.groups[0] === 'undefined')
                    throw new Error('Unknown error in parsing.');
                const end = ast_node_position_1.ASTNodePosition.getEnd(start, inlineMathMatch.matched);
                const inlineMath = new inline_math_1.InlineMath(true, start, end, parent);
                inlineMath.addChildren(new text_node_1.TextNode(inlineMathMatch.groups[0], true, ast_node_position_1.ASTNodePosition.getEnd(start, '$'), inlineMath));
                contents.push(inlineMath);
                start = end;
                lineRemainder = inlineMathMatch.after;
            }
            else if ((shortInnerEnvMatch === null || shortInnerEnvMatch === void 0 ? void 0 : shortInnerEnvMatch.index) === 0) {
                if (typeof shortInnerEnvMatch.groups[0] === 'undefined' ||
                    typeof shortInnerEnvMatch.groups[1] === 'undefined' ||
                    typeof shortInnerEnvMatch.groups[2] === 'undefined') {
                    throw new Error('Unknown error in parsing.');
                }
                const end = ast_node_position_1.ASTNodePosition.getEnd(start, shortInnerEnvMatch.matched);
                const innerEnv = new inner_env_1.InnerEnv(shortInnerEnvMatch.groups[1], false, start, end, parent);
                innerEnv.addChildren(new text_node_1.TextNode(shortInnerEnvMatch.groups[2], false, ast_node_position_1.ASTNodePosition.getEnd(start, shortInnerEnvMatch.groups[0]), innerEnv));
                contents.push(innerEnv);
                start = end;
                lineRemainder = shortInnerEnvMatch.after;
            }
            else if ((verboseIndexInnerEnvMatch === null || verboseIndexInnerEnvMatch === void 0 ? void 0 : verboseIndexInnerEnvMatch.index) === 0) {
                if (typeof verboseIndexInnerEnvMatch.groups[0] ===
                    'undefined' ||
                    typeof verboseIndexInnerEnvMatch.groups[1] === 'undefined') {
                    throw new Error('Unknown error in parsing.');
                }
                const end = ast_node_position_1.ASTNodePosition.getEnd(start, verboseIndexInnerEnvMatch.matched);
                const innerEnv = new inner_env_1.InnerEnv('_index', false, start, end, parent);
                const innerStart = ast_node_position_1.ASTNodePosition.getEnd(start, '"');
                innerEnv.setMetadata('_index', verboseIndexInnerEnvMatch.groups[1]);
                this.parseInlineContent(innerStart, innerEnv, verboseIndexInnerEnvMatch.groups[0]);
                contents.push(innerEnv);
                start = end;
                lineRemainder = verboseIndexInnerEnvMatch.after;
            }
            else if ((verboseInnerEnvMatch === null || verboseInnerEnvMatch === void 0 ? void 0 : verboseInnerEnvMatch.index) === 0) {
                if (typeof verboseInnerEnvMatch.groups[0] === 'undefined' ||
                    typeof verboseInnerEnvMatch.groups[1] === 'undefined' ||
                    typeof verboseInnerEnvMatch.groups[2] === 'undefined') {
                    throw new Error('Unknown error in parsing.');
                }
                const end = ast_node_position_1.ASTNodePosition.getEnd(start, verboseInnerEnvMatch.matched);
                let variant = verboseInnerEnvMatch.groups[2];
                if (verboseInnerEnvMatch.groups[1] === '#')
                    variant = '_reference';
                const innerEnv = new inner_env_1.InnerEnv(variant, false, start, end, parent);
                if (verboseInnerEnvMatch.groups[1] === '#')
                    innerEnv.setMetadata('_reference', verboseInnerEnvMatch.groups[2]);
                if (typeof verboseInnerEnvMatch.groups[3] !== 'undefined')
                    innerEnv.setMetadata('_index', verboseInnerEnvMatch.groups[3]);
                const innerStart = ast_node_position_1.ASTNodePosition.getEnd(start, '"');
                this.parseInlineContent(innerStart, innerEnv, verboseInnerEnvMatch.groups[0]);
                contents.push(innerEnv);
                start = end;
                lineRemainder = verboseInnerEnvMatch.after;
            }
            else {
                const matches = [
                    inlineMathMatch,
                    shortInnerEnvMatch,
                    verboseIndexInnerEnvMatch,
                    verboseInnerEnvMatch,
                ].filter(match => typeof match !== 'undefined');
                if (matches.length > 0) {
                    matches.sort((a, b) => a.index - b.index);
                    const nearestMatch = matches[0];
                    lineRemainder = lineRemainder.slice(nearestMatch.before.length);
                    start = ast_node_position_1.ASTNodePosition.getEnd(start, nearestMatch.before);
                    contents.push(nearestMatch.before);
                }
                else {
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
    parseMetablock(source) {
        var _a;
        if (typeof source === 'undefined')
            return {};
        const res = (_a = yaml_1.parse(source)) !== null && _a !== void 0 ? _a : {};
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
    parseDocumentPart(start, parent, source) {
        const match = documentPartMatcher.findFirstMatch(source);
        if (typeof match === 'undefined' || match.index !== 0) {
            return;
        }
        const [beforeTitle, variant, title, metablock] = match.groups;
        if (typeof beforeTitle === 'undefined' ||
            typeof variant === 'undefined' ||
            typeof title === 'undefined') {
            throw new Error('Unknown error in parsing.');
        }
        const end = ast_node_position_1.ASTNodePosition.getEnd(start, multiline_1.trimEndingNewline(match.matched));
        const documentPart = new document_part_1.DocumentPart(variant, start, end, parent);
        const titleStart = ast_node_position_1.ASTNodePosition.getEnd(start, beforeTitle);
        this.parseInlineContent(titleStart, documentPart, multiline_1.trimEndingNewline(title));
        const metadata = this.parseMetablock(metablock);
        Object.keys(metadata).forEach(key => documentPart.setMetadata(key, metadata[key]));
        return {
            parsed: documentPart,
            after: `${multiline_1.getEndingNewline(match.matched)}${match.after}`,
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
    parseDocumentObject(start, parent, source) {
        return this.parseDocumentObjectOrOuterEnv(start, parent, source, documentObjectMatcher, document_object_1.DocumentObject);
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
    parseOuterEnv(start, parent, source) {
        return this.parseDocumentObjectOrOuterEnv(start, parent, source, outerEnvMatcher, outer_env_1.OuterEnv);
    }
    parseDocumentObjectOrOuterEnv(start, parent, source, matcher, NodeConstructor) {
        const match = matcher.findFirstMatch(source);
        if (typeof match === 'undefined' || match.index !== 0) {
            return;
        }
        const [variant, metablock] = match.groups;
        if (typeof variant === 'undefined')
            throw new Error('Unknown error in parsing.');
        const end = ast_node_position_1.ASTNodePosition.getEnd(start, multiline_1.trimEndingNewline(match.matched));
        const node = new NodeConstructor(variant, false, start, end, parent);
        const metadata = this.parseMetablock(metablock);
        Object.keys(metadata).forEach(key => node.setMetadata(key, metadata[key]));
        return {
            parsed: node,
            after: `${multiline_1.getEndingNewline(match.matched)}${match.after}`,
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
    parseFragileOuterEnv(start, parent, source) {
        const match = fragileOuterEnvMatcher.findFirstMatch(source);
        if (typeof match === 'undefined' || match.index !== 0) {
            return;
        }
        const [variant, metablock] = match.groups;
        if (typeof variant === 'undefined')
            throw new Error('Unknown error in parsing.');
        const end = ast_node_position_1.ASTNodePosition.getEnd(start, multiline_1.trimEndingNewline(match.matched));
        const node = new outer_env_1.OuterEnv(variant, true, start, end, parent);
        const metadata = this.parseMetablock(metablock);
        Object.keys(metadata).forEach(key => node.setMetadata(key, metadata[key]));
        return {
            parsed: node,
            after: `${multiline_1.getEndingNewline(match.matched)}${match.after}`,
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
    parseFragileOuterEnvContent(start, parent, source) {
        var _a;
        if (!parent.isFragile)
            return;
        const match = textBlockSeparatorMatcher.findFirstMatch(source);
        const { before, after } = match !== null && match !== void 0 ? match : { before: source, after: '' };
        const end = ast_node_position_1.ASTNodePosition.getEnd(start, before);
        const content = multiline_1.trimIndentation(before, start.column - 1);
        const textBlock = new text_block_1.TextBlock(true, start, end, parent);
        textBlock.addChildren(new text_node_1.TextNode(content, true, start, textBlock));
        return {
            parsed: textBlock,
            after: `${(_a = match === null || match === void 0 ? void 0 : match.matched) !== null && _a !== void 0 ? _a : ''}${after}`,
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
    parseIndentedBlock(start, parent, source) {
        var _a, _b;
        if (parent.children.length === 0 ||
            start.column <= parent.children[0].startColumn) {
            return;
        }
        const match = textBlockSeparatorMatcher.findFirstMatch(source);
        const { before, after } = match !== null && match !== void 0 ? match : { before: source, after: '' };
        const end = ast_node_position_1.ASTNodePosition.getEnd(start, before);
        let content = multiline_1.trimIndentation(before, start.column - 1);
        const metablockMatch = metablockMatcher.findFirstMatch(content);
        const metablock = (_a = metablockMatch === null || metablockMatch === void 0 ? void 0 : metablockMatch.matched) !== null && _a !== void 0 ? _a : '';
        if (metablock.length > 0)
            content = multiline_1.trimEndingNewline(content.slice(0, -metablock.length));
        const indentedBlock = new indented_block_1.IndentedBlock(false, start, end, parent);
        const metadata = this.parseMetablock(metablock);
        Object.keys(metadata).forEach(key => indentedBlock.setMetadata(key, metadata[key]));
        this.parseInlineContent(start, indentedBlock, content);
        return {
            parsed: indentedBlock,
            after: `${(_b = match === null || match === void 0 ? void 0 : match.matched) !== null && _b !== void 0 ? _b : ''}${after}`,
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
    parseTextBlock(start, parent, source) {
        var _a, _b;
        const match = textBlockSeparatorMatcher.findFirstMatch(source);
        const { before, after } = match !== null && match !== void 0 ? match : { before: source, after: '' };
        const end = ast_node_position_1.ASTNodePosition.getEnd(start, before);
        let content = multiline_1.trimIndentation(before, start.column - 1);
        const metablockMatch = metablockMatcher.findFirstMatch(content);
        const metablock = (_a = metablockMatch === null || metablockMatch === void 0 ? void 0 : metablockMatch.matched) !== null && _a !== void 0 ? _a : '';
        if (metablock.length > 0)
            content = multiline_1.trimEndingNewline(content.slice(0, -metablock.length));
        const textBlock = new text_block_1.TextBlock(false, start, end, parent);
        const metadata = this.parseMetablock(metablock);
        Object.keys(metadata).forEach(key => textBlock.setMetadata(key, metadata[key]));
        this.parseInlineContent(start, textBlock, content);
        return { parsed: textBlock, after: `${(_b = match === null || match === void 0 ? void 0 : match.matched) !== null && _b !== void 0 ? _b : ''}${after}` };
    }
    /**
     * Parse a text node
     *
     * @param start The position of the start of the text node
     * @param parent The parent node of the text node
     * @param source The source of the text node to be parsed
     * @returns A new text node
     */
    parseTextNode(start, parent, source) {
        return new text_node_1.TextNode(source, false, start, parent);
    }
}
exports.Parser = Parser;
