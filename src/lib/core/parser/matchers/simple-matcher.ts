import {Match} from './match';
import {Matcher} from './matcher';

/**
 * A matcher which can find basic matches against a regex pattern is a given
 * text
 */
export class SimpleMatcher implements Matcher {
    /** @param regex The regex to be used for matching */
    constructor(private readonly regex: RegExp) {}

    findFirstMatch(source: string): Match | undefined {
        const res = this.regex.exec(source);
        if (res === null) return;
        const [matched, ...groups] = res;
        return new Match(source, matched, res.index, groups);
    }
}
