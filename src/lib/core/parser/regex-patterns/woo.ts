import {
    horizontalWhitespace,
    uppercaseLetter,
} from '../../../util/regex-patterns/charsets';
import {endOfLineOrString} from '../../../util/regex-patterns/sequences';

/**
 * Regex pattern representing a YAML metablock in a WooWoo document. This is NOT
 * checking whether it actually is valid YAML, and whether the indentation of
 * the metablock is valid.
 *
 * Contains no capture groups.
 */
export const yamlMetablock =
    '(?:' + // Begin a non-capturing group
    `${horizontalWhitespace}+` + // One or more horizontal whitespace chars
    '\\w+' + // One ore more word chars
    ':' + // A colon
    '.*' + // Any number of any chars (of any type except linebreaks)
    endOfLineOrString + // End of line or string
    ')+'; // End the non-capturing group and optionally repeat it more times

/**
 * The variant of a document part - an uppercase letter, followed by any number
 * of word characters
 */
const documentPartVariant = `${uppercaseLetter}\\w*`;

/**
 * Regex pattern representing the definition of a WooWoo document part,
 * possibly including its metablock.
 *
 * Contains 3 capture groups:
 * 1. Everything until (excluding) the title
 * 2. The variant of the document part
 * 3. The title of the document part
 * 4. An optional YAML metablock of the document part
 */
export const documentPart =
    '^' + // Beginning of a line or of the string
    '(' + // Begin the 1st capture group
    '\\.' + // A dot
    `(${documentPartVariant})` + // The 2nd capture group containing the...
    // ...variant of the document part
    `${horizontalWhitespace}+` + // One or more horizontal whitespace chars
    ')' + // End the 1st capture group
    '(.+)' + // One of more chars (of any type except linebreaks) contained...
    // ...by the 3rd capture group
    endOfLineOrString + // End of line or string
    `(${yamlMetablock})?`; // Optional YAML metablock contained by the 4th capture group
