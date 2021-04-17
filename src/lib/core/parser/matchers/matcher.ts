import {Match} from './match';

/** Is able to find pattern matches in source text */
export interface Matcher {
    /**
     * Find the first match of its own pattern in a given text
     *
     * @param source The input text to find the match in
     * @returns The match found in the input text, or `undefined` if no match
     * was found
     */
    findFirstMatch(source: string): Match | undefined;
}
