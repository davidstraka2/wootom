"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inlineMath = exports.verboseIndexInnerEnvEnd = exports.verboseInnerEnvEnd = exports.shortInnerEnv = exports.fragileOuterEnv = exports.outerEnv = exports.documentObject = exports.documentPart = exports.yamlMetablock = void 0;
const charsets_1 = require("../../../util/regex-patterns/charsets");
const sequences_1 = require("../../../util/regex-patterns/sequences");
/**
 * Regex pattern representing a YAML metablock in a WooWoo document. This is NOT
 * checking whether it actually is valid YAML, and whether the indentation of
 * the metablock is valid.
 *
 * Contains no capture groups.
 */
exports.yamlMetablock = '(?:' + // Begin a non-capturing group
    `${charsets_1.horizontalWhitespace}+` + // One or more horizontal whitespace chars
    '\\w+' + // One ore more word chars
    ':' + // A colon
    '.*' + // Any number of any chars (of any type except linebreaks)
    sequences_1.endOfLineOrString + // End of line or string
    ')+'; // End the non-capturing group and optionally repeat it more times
/**
 * The variant of a document part - an uppercase letter, followed by any number
 * of word characters
 */
const documentPartVariant = `${charsets_1.uppercaseLetter}\\w*`;
/**
 * Regex pattern representing the definition of a WooWoo document part,
 * possibly including its metablock.
 *
 * Contains 4 capture groups:
 * 1. Everything before the title
 * 2. The variant of the document part
 * 3. The title of the document part
 * 4. An optional YAML metablock of the document part
 */
exports.documentPart = '^' + // Beginning of the string (or in multiline mode also of some line)
    '(' + // Begin the 1st capture group
    '\\.' + // A dot
    // The 2nd capture group containing the variant of the document part
    `(${documentPartVariant})` +
    `${charsets_1.horizontalWhitespace}+` + // One or more horizontal whitespace chars
    ')' + // End the 1st capture group
    // One of more chars (of any type except linebreaks) contained by the 3rd...
    // ...capture group
    '(.+)' +
    sequences_1.endOfLineOrString + // End of line or string
    // Optional YAML metablock contained by the 4th capture group
    `(${exports.yamlMetablock})?`;
/**
 * Get a regex pattern representing the definition of either a WooWoo document
 * object or an outer environment. Furthermore these may and may not be fragile.
 *
 * Contains 2 capture groups:
 * 1. The variant
 * 2. An optional YAML metablock
 *
 * @param kind Determines whether the resulting pattern matches a document
 * object, or an outer environment
 * @param isFragile Whether the resulting pattern should represent a fragile
 * element (`true` if it should)
 * @returns The desired regex pattern
 */
function getDocumentObjectOrOuterEnv(kind, isFragile) {
    const pattern = 
    // Beginning of the string (or in multiline mode also of some line)
    '^' +
        // Any number of horizontal whitespace chars
        `${charsets_1.horizontalWhitespace}*` +
        (isFragile ? '!' : '\\.') + // A dot, or an exclamation mark if fragile
        '(' + // Begin the 1st capture group = variant name
        // A lowercase letter if outer environment, an uppercase letter if...
        // ...document object
        (kind === 'DocumentObject' ? charsets_1.uppercaseLetter : charsets_1.lowercaseLetter) +
        '\\w*' + // Any number of word chars
        ')' + // End the 1st capture group
        ':' + // A colon
        // Any number of horizontal whitespace chars
        `${charsets_1.horizontalWhitespace}*` +
        sequences_1.endOfLineOrString + // End of line or string
        // Optional YAML metablock contained by the 2nd capture group
        `(${exports.yamlMetablock})?`;
    return pattern;
}
/**
 * Regex pattern representing the definition of a WooWoo document object,
 * possibly including its metablock.
 *
 * Contains 2 capture groups:
 * 1. The variant of the document object
 * 2. An optional YAML metablock of the document object
 */
exports.documentObject = getDocumentObjectOrOuterEnv('DocumentObject', false);
/**
 * Regex pattern representing the definition of a WooWoo outer environment,
 * possibly including its metablock.
 *
 * Contains 2 capture groups:
 * 1. The variant of the outer environment
 * 2. An optional YAML metablock of the outer environment
 */
exports.outerEnv = getDocumentObjectOrOuterEnv('OuterEnv', false);
/**
 * Regex pattern representing the definition of a fragile WooWoo outer
 * environment, possibly including its metablock.
 *
 * Contains 2 capture groups:
 * 1. The variant of the fragile outer environment
 * 2. An optional YAML metablock of the fragile outer environment
 */
exports.fragileOuterEnv = getDocumentObjectOrOuterEnv('OuterEnv', true);
/**
 * A regex pattern representing a basic type short WooWoo inner environment.
 *
 * Contains 3 capture groups:
 * 1. The variant
 * 2. Everything before the content
 * 3. The content
 */
exports.shortInnerEnv = '(' + // Begin the 1st capture group
    '\\.' + // A dot
    '(' + // Begin the 2nd capture group
    charsets_1.lowercaseLetter + // A lowercase letter
    '[\\w-]*' + // Any number of word chars or dashes
    ')' + // End the 2nd capture group
    ':' + // A colon
    ')' + // End the 1st capture group
    '(' + // Begin the 3rd capture group
    '[\\w-]*' + // Any number of word chars or dashes
    ')'; // End the 3rd capture group
/**
 * A regex pattern representing the definition of either a basic, or a reference
 * type verbose WooWoo inner environment ending.
 *
 * Contains 3 capture groups:
 * 1. The separator (determining whether the env is basic, or reference)
 * 2. The variant
 * 3. An optional index
 */
exports.verboseInnerEnvEnd = '"' + // A double quotation mark
    // The 1st capture group containing the separator - either a dot, or a...
    // ...number sign
    '(\\.|#)' +
    '(' + // Begin the 2nd capture group
    charsets_1.lowercaseLetter + // A lowercase letter
    '[\\w-]*' + // Any number of word chars or dashes
    ')(?:' + // End the 2nd capture group; begin a non-capturing group
    '\\.' + // A dot
    '(\\d+)' + // The 3rd (optional) capture group containing one or more digits
    ')?'; // End the non-capturing group
/**
 * A regex pattern representing the definition of an index type verbose WooWoo
 * inner environment ending.
 *
 * Contains 1 capture group:
 * 1. The index
 */
exports.verboseIndexInnerEnvEnd = '"' + // A double quotation mark
    // A non-capturing group containing the separator - a dot or an at sign
    '(?:\\.|@)' +
    // The 1st capture group containing the index value - one or more digits
    '(\\d+)';
/**
 * A regex pattern representing an inline math element.
 *
 * Contains 1 capture group:
 * 1. The content
 */
exports.inlineMath = '\\$' + // A dollar sign
    // The 1st capture group containing one or more chars of any type but a...
    // ...dollar sign
    '([^$]+)' +
    '\\$'; // A dollar sign
