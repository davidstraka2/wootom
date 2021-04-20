"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleMatcher = void 0;
const match_1 = require("./match");
/**
 * A matcher which can find basic matches against a regex pattern in a given
 * text
 */
class SimpleMatcher {
    /** @param regex The regex to be used for matching */
    constructor(regex) {
        this.regex = regex;
    }
    findFirstMatch(source) {
        const res = this.regex.exec(source);
        if (res === null)
            return;
        const [matched, ...groups] = res;
        return new match_1.Match(source, matched, res.index, groups);
    }
}
exports.SimpleMatcher = SimpleMatcher;
