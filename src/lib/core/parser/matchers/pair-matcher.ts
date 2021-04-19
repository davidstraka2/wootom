import {Match} from './match';
import {Matcher} from './matcher';

/**
 * A matcher which can find scoped matches against opening and closing regex
 * patterns in a given text.
 */
export class PairMatcher implements Matcher {
    /**
     * Any capture groups matched by the given regex patterns are concatenated
     * in the resulting Match, with the text in between the matched pair being
     * also placed between the two group sets.
     *
     * @param beginRegex The regex to be used for matching the pair opening
     * @param endRegex The regex to be used for matching the pair ending
     */
    constructor(
        private readonly beginRegex: RegExp,
        private readonly endRegex: RegExp,
    ) {}

    findFirstMatch(source: string): Match | undefined {
        let beginMatchCount = 0;
        const beginRes = this.beginRegex.exec(source);
        if (beginRes === null) return;
        beginMatchCount++;
        let remainingSource = source.slice(beginRes.index + beginRes[0].length);
        let endRes: RegExpExecArray | null = null;
        while (beginMatchCount > 0 && remainingSource.length > 0) {
            endRes = this.endRegex.exec(remainingSource);
            if (endRes === null) return;
            const tmpBeginRes = this.beginRegex.exec(remainingSource);
            const res = this.getFirstRes(tmpBeginRes, endRes);
            beginMatchCount += res === endRes ? -1 : 1;
            remainingSource = remainingSource.slice(res.index + res[0].length);
        }
        if (endRes === null) return;
        const matched = source.slice(
            beginRes.index,
            remainingSource.length > 0 ? -remainingSource.length : undefined,
        );
        const inner = matched.slice(beginRes[0].length, -endRes[0].length);
        const groups = [...beginRes.slice(1), inner, ...endRes.slice(1)];
        return new Match(source, matched, beginRes.index, groups);
    }

    /**
     * Determines which of the given regex search results is first
     *
     * @param beginRes The result of begin regex search
     * @param endRes The result of end regex search, that is not `null`
     * @returns The first result, or `endRes` by default
     */
    private getFirstRes(
        beginRes: RegExpExecArray | null,
        endRes: RegExpExecArray,
    ): RegExpExecArray {
        if (beginRes === null) return endRes;
        if (beginRes.index < endRes.index) return beginRes;
        return endRes;
    }
}
