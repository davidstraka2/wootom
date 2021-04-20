"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endOfLineOrString = exports.eol = void 0;
/** Regex sequence matching CRLF or LF */
exports.eol = '\\r?\\n';
/** Regex sequence matching CRLF or LF or the end of a string */
exports.endOfLineOrString = `(?:(?:${exports.eol})|$)`;
