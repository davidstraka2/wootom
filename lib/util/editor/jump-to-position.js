"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jumpToPosition = void 0;
const atom_1 = require("atom");
function jumpToPosition(editor, line, column = 1, options = {
    focus: true,
}) {
    // The coords of a Point are zero-indexed
    const coords = [line - 1, column - 1];
    const position = new atom_1.Point(...coords);
    console.log(`Go to line ${line}, column ${column}.`);
    editor.setCursorBufferPosition(position);
    editor.unfoldBufferRow(coords[0]);
    editor.scrollToBufferPosition(position, {
        center: true,
    });
    if (options.focus)
        atom.views.getView(editor).focus();
}
exports.jumpToPosition = jumpToPosition;
