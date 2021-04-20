/**
 * Count the number of lines of a given text
 *
 * @param text The input text
 * @returns The number of lines of the input text
 */
export declare function countLines(text: string): number;
/**
 * Get the last line of a given text
 *
 * @param text The input text
 * @returns The last line of the input text
 */
export declare function getLastLine(text: string): string;
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
export declare function getEndingNewlineLength(text: string): number;
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
export declare function getEndingNewline(text: string): string;
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
export declare function trimEndingNewline(text: string): string;
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
export declare function trimIndentation(text: string, indentationLength: number): string;
