import { Match } from './match';
import { Matcher } from './matcher';
/**
 * A matcher which can find scoped matches against opening and closing regex
 * patterns in a given text.
 */
export declare class PairMatcher implements Matcher {
    private readonly beginRegex;
    private readonly endRegex;
    /**
     * Any capture groups matched by the given regex patterns are concatenated
     * in the resulting Match, with the text in between the matched pair being
     * also placed between the two group sets.
     *
     * @param beginRegex The regex to be used for matching the pair opening
     * @param endRegex The regex to be used for matching the pair ending
     */
    constructor(beginRegex: RegExp, endRegex: RegExp);
    findFirstMatch(source: string): Match | undefined;
    /**
     * Determines which of the given regex search results is first
     *
     * @param beginRes The result of begin regex search
     * @param endRes The result of end regex search, that is not `null`
     * @returns The first result, or `endRes` by default
     */
    private getFirstRes;
}
