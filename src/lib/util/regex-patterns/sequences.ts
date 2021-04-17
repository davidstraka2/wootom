/** Regex sequence matching CRLF or LF */
export const eol = '\\r?\\n';

/** Regex sequence matching CRLF or LF or the end of a string */
export const endOfLineOrString = `(?:(?:${eol})|$)`;
