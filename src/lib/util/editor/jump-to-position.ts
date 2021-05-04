import {Point, TextEditor} from 'atom';

export function jumpToPosition(
    editor: TextEditor,
    line: number,
    column = 1,
    options: {
        focus: boolean;
    } = {
        focus: true,
    },
): void {
    // The coords of a Point are zero-indexed
    const coords = [line - 1, column - 1];
    const position = new Point(...coords);
    console.log(`Go to line ${line}, column ${column}.`);
    editor.setCursorBufferPosition(position);
    editor.unfoldBufferRow(coords[0]);
    editor.scrollToBufferPosition(position, {
        center: true,
    });
    if (options.focus) atom.views.getView(editor).focus();
}
