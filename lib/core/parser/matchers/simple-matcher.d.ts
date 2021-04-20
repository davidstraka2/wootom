import { Match } from './match';
import { Matcher } from './matcher';
/**
 * A matcher which can find basic matches against a regex pattern in a given
 * text
 */
export declare class SimpleMatcher implements Matcher {
    private readonly regex;
    /** @param regex The regex to be used for matching */
    constructor(regex: RegExp);
    findFirstMatch(source: string): Match | undefined;
}
