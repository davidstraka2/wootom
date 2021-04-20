import {CompositeDisposable, TextEditor} from 'atom';
import {WorkspaceObserver} from '../atom-abstractions/workspace-observer';
import {HTMLViewModel} from '../html-view/html-view-model';
import {Parser} from '../parser/parser';
import {RenderingManager} from '../rendering/rendering-manager';

export class PreviewSubscriber {
    private contentCache: string | undefined;
    private editor: TextEditor | undefined;
    private editorSubscriptions = new CompositeDisposable();
    private workspaceSubscriptions = new CompositeDisposable();

    constructor(
        private readonly htmlViewModel: Required<HTMLViewModel>,
        private readonly parser: Required<Parser>,
        private readonly renderingManager: Required<RenderingManager>,
        private readonly workspaceObserver: WorkspaceObserver,
    ) {}

    activate(): void {
        this.workspaceSubscriptions.add(
            this.workspaceObserver.onDidChangeActiveTextEditor(
                this.updateEditor.bind(this),
            ),
        );
    }

    deactivate(): void {
        this.contentCache = undefined;
        this.editor = undefined;
        this.editorSubscriptions.dispose();
        this.workspaceSubscriptions.dispose();
    }

    async toggle(): Promise<void> {
        if (this.htmlViewModel.isOpen) {
            console.log('Wootom: Closing preview pane.');
            this.htmlViewModel.close();
        } else {
            console.log('Wootom: Opening preview pane.');
            await this.htmlViewModel.open();
        }
    }

    private updateContent(): void {
        if (typeof this.editor === 'undefined' || !this.htmlViewModel.isOpen) {
            return;
        }
        const content = this.editor.getText();
        if (
            typeof this.contentCache === 'undefined' ||
            this.contentCache !== content
        ) {
            console.log('Wootom: Rendering content preview.');
            this.contentCache = content;
            const documentRoot = this.parser.parse(content);
            const html = this.renderingManager.render(documentRoot);
            this.htmlViewModel.render(html);
        } else {
            console.log('Wootom: Hit content cache.');
        }
    }

    private updateEditor(editor?: TextEditor | undefined): void {
        this.contentCache = undefined;
        this.editorSubscriptions.dispose();
        this.editor = editor;
        if (typeof editor === 'undefined') {
            console.log('Wootom: Unsubscribing from text editor.');
            return;
        }
        console.log('Wootom: Subscribing to new editor.');
        this.editorSubscriptions.add(
            editor.onDidSave(this.updateContent.bind(this)),
            editor.onDidStopChanging(this.updateContent.bind(this)),
        );
        this.updateContent();
    }
}
