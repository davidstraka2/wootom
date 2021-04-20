import {Disposable, TextEditor} from 'atom';

/** Observes changes in the workspace */
export interface WorkspaceObserver {
    onDidChangeActiveTextEditor(
        callback: (editor?: TextEditor | undefined) => void,
    ): Disposable;
}
