"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = void 0;
/** A match from a search in text */
class Match {
    /**
     * @param source The source text where match was being searched for
     * @param matched The found match
     * @param index The index (within the source) of the found match
     * @param groups Any groups within the found match
     */
    constructor(source, matched, index, groups) {
        this.matched = matched;
        this.index = index;
        this.before = source.slice(0, index);
        this.after = source.slice(index + this.length);
        this._groups = groups;
    }
    /** The groups of the match */
    get groups() {
        return this._groups.slice();
    }
    /** The length of the found match */
    get length() {
        return this.matched.length;
    }
}
exports.Match = Match;
