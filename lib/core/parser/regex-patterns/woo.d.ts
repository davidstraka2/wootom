/**
 * Regex pattern representing a YAML metablock in a WooWoo document. This is NOT
 * checking whether it actually is valid YAML, and whether the indentation of
 * the metablock is valid.
 *
 * Contains no capture groups.
 */
export declare const yamlMetablock: string;
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
export declare const documentPart: string;
/**
 * Regex pattern representing the definition of a WooWoo document object,
 * possibly including its metablock.
 *
 * Contains 2 capture groups:
 * 1. The variant of the document object
 * 2. An optional YAML metablock of the document object
 */
export declare const documentObject: string;
/**
 * Regex pattern representing the definition of a WooWoo outer environment,
 * possibly including its metablock.
 *
 * Contains 2 capture groups:
 * 1. The variant of the outer environment
 * 2. An optional YAML metablock of the outer environment
 */
export declare const outerEnv: string;
/**
 * Regex pattern representing the definition of a fragile WooWoo outer
 * environment, possibly including its metablock.
 *
 * Contains 2 capture groups:
 * 1. The variant of the fragile outer environment
 * 2. An optional YAML metablock of the fragile outer environment
 */
export declare const fragileOuterEnv: string;
/**
 * A regex pattern representing a basic type short WooWoo inner environment.
 *
 * Contains 3 capture groups:
 * 1. The variant
 * 2. Everything before the content
 * 3. The content
 */
export declare const shortInnerEnv: string;
/**
 * A regex pattern representing the definition of either a basic, or a reference
 * type verbose WooWoo inner environment ending.
 *
 * Contains 3 capture groups:
 * 1. The separator (determining whether the env is basic, or reference)
 * 2. The variant
 * 3. An optional index
 */
export declare const verboseInnerEnvEnd: string;
/**
 * A regex pattern representing the definition of an index type verbose WooWoo
 * inner environment ending.
 *
 * Contains 1 capture group:
 * 1. The index
 */
export declare const verboseIndexInnerEnvEnd: string;
/**
 * A regex pattern representing an inline math element.
 *
 * Contains 1 capture group:
 * 1. The content
 */
export declare const inlineMath: string;
