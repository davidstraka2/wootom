"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uppercaseLetter = exports.lowercaseLetter = exports.horizontalWhitespace = void 0;
/**
 * Regex character set of horizontal whitespace characters (that is e.g. a
 * normal space, \t, but not \n)
 */
exports.horizontalWhitespace = '[^\\S\\r\\n]';
/** Regex character set of lowercase letters */
exports.lowercaseLetter = '[a-z]';
/** Regex character set of uppercase letters */
exports.uppercaseLetter = '[A-Z]';
