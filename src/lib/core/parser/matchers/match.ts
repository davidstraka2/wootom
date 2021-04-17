/** A match from a search in text */
export class Match {
    /** The text of the source after the found match */
    readonly after: string;
    /** The text of the source before the found match */
    readonly before: string;
    /** Any groups within the found match */
    private readonly _groups: (string | undefined)[];

    /**
     * @param source The source text where match was being searched for
     * @param matched The found match
     * @param index The index (within the source) of the found match
     * @param groups Any groups within the found match
     */
    constructor(
        source: string,
        readonly matched: string,
        readonly index: number,
        groups: (string | undefined)[],
    ) {
        this.before = source.slice(0, index);
        this.after = source.slice(index + this.length);
        this._groups = groups;
    }

    /** The groups of the match */
    get groups(): (string | undefined)[] {
        return this._groups.slice();
    }

    /** The length of the found match */
    get length(): number {
        return this.matched.length;
    }
}
