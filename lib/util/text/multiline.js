"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimIndentation = exports.trimEndingNewline = exports.getEndingNewline = exports.getEndingNewlineLength = exports.getLastLine = exports.countLines = void 0;
const charsets_1 = require("../regex-patterns/charsets");
/**
 * Count the number of lines of a given text
 *
 * @param text The input text
 * @returns The number of lines of the input text
 */
function countLines(text) {
    var _a;
    return ((_a = text.match(/\n/g)) !== null && _a !== void 0 ? _a : '').length + 1;
}
exports.countLines = countLines;
/**
 * Get the last line of a given text
 *
 * @param text The input text
 * @returns The last line of the input text
 */
function getLastLine(text) {
    return text.slice(text.lastIndexOf('\n') + 1);
}
exports.getLastLine = getLastLine;
/**
 * Get the length of the ending newline of a given text
 *
 * @param text The input text
 * @returns The length of the ending newline of the input text
 *
 * @example
 * ```ts
 * getEndingNewlineLength('Lorem ipsum') // 0
 * getEndingNewlineLength('Lorem ipsum\n') // 1
 * getEndingNewlineLength('Lorem ipsum\r\n') // 2
 * getEndingNewlineLength('Lorem ipsum\n\n') // 1
 * ```
 */
function getEndingNewlineLength(text) {
    if (text.slice(-2) === '\r\n')
        return 2;
    if (text.slice(-1) === '\n')
        return 1;
    return 0;
}
exports.getEndingNewlineLength = getEndingNewlineLength;
/**
 * Get the ending newline of a given text
 *
 * @param text The input text
 * @returns The ending newline of a the input text
 *
 * @example
 * ```ts
 * getEndingNewline('Lorem ipsum') // ''
 * getEndingNewline('Lorem ipsum\n') // '\n'
 * getEndingNewline('Lorem ipsum\r\n') // '\r\n'
 * getEndingNewline('Lorem ipsum\n\n') // '\n'
 * ```
 */
function getEndingNewline(text) {
    const newlineLength = getEndingNewlineLength(text);
    if (newlineLength === 0)
        return '';
    return text.slice(-newlineLength);
}
exports.getEndingNewline = getEndingNewline;
/**
 * Trim the ending newline from a given text
 *
 * @param text The input text
 * @returns The input text without its ending newline
 *
 * @example
 * ```ts
 * trimEndingNewline('Lorem ipsum') // 'Lorem ipsum'
 * trimEndingNewline('Lorem ipsum\n') // 'Lorem ipsum'
 * trimEndingNewline('Lorem ipsum\r\n') // 'Lorem ipsum'
 * trimEndingNewline('Lorem ipsum\n\n') // 'Lorem ipsum\n'
 * ```
 */
function trimEndingNewline(text) {
    const newlineLength = getEndingNewlineLength(text);
    if (newlineLength === 0)
        return text;
    return text.slice(0, -newlineLength);
}
exports.trimEndingNewline = trimEndingNewline;
/**
 * Trim indentation of up to a given length from text
 *
 * @param text The input text
 * @param indentationLength The maximum length (per line) of the indentation to
 * be trimmed
 * @returns The input text without the indentation
 * @throws {RangeError} When `indentationLength` is less than 0
 *
 * @example
 * ```ts
 * trimIndentation('Lorem ipsum', 2) // 'Lorem ipsum'
 * trimIndentation('  Lorem\n  ipsum\n', 2) // 'Lorem\nipsum\n'
 * trimIndentation('  Lorem\n  ipsum\n', 1) // ' Lorem\n ipsum\n'
 * trimIndentation('  Lorem\n    ipsum\n', 2) // 'Lorem\n  ipsum\n'
 * ```
 */
function trimIndentation(text, indentationLength) {
    if (indentationLength < 0)
        throw new RangeError('Argument indentationLength must be >= 0.');
    const lines = text.split('\n');
    const trimmedLines = lines.map(line => {
        const lineIndentationLength = getLineIndentationLength(line, indentationLength);
        return line.slice(lineIndentationLength);
    });
    return trimmedLines.join('\n');
}
exports.trimIndentation = trimIndentation;
/**
 * Get the length of the indentation up to a given max of a given line of text
 *
 * @param line The input line of text
 * @param max The maximum length of the indentation to get, or -1/`undefined` for
 * no maximum length
 * @returns The length of the indentation of the input text
 */
function getLineIndentationLength(line, max = -1) {
    const indentationRegex = new RegExp(charsets_1.horizontalWhitespace);
    if (max < 0)
        max = line.length;
    let i = 0;
    while (i < max) {
        if (!indentationRegex.test(line.charAt(i)))
            break;
        i++;
    }
    return i;
}
