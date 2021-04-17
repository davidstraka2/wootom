/**
 * Count the number of lines of a given text
 *
 * @param text The input text
 * @returns The number of lines of the input text
 */
export function countLines(text: string): number {
    return (text.match(/\n/g) ?? '').length + 1;
}

/**
 * Get the last line of a given text
 *
 * @param text The input text
 * @returns The last line of the input text
 */
export function getLastLine(text: string): string {
    return text.slice(text.lastIndexOf('\n') + 1);
}

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
export function getEndingNewlineLength(text: string): number {
    if (text.slice(-2) === '\r\n') return 2;
    if (text.slice(-1) === '\n') return 1;
    return 0;
}

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
export function getEndingNewline(text: string): string {
    const newlineLength = getEndingNewlineLength(text);
    if (newlineLength === 0) return '';
    return text.slice(-newlineLength);
}

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
export function trimEndingNewline(text: string): string {
    const newlineLength = getEndingNewlineLength(text);
    if (newlineLength === 0) return text;
    return text.slice(0, -newlineLength);
}
