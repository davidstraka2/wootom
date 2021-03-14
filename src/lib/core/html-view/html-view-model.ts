import {ViewModel, ViewRegistry, Workspace} from 'atom';

import {HTMLView} from './html-view';

/** Handles the application logic of the HTML View pane item */
export class HTMLViewModel implements ViewModel {
    /**
     * @param title The title of the HTML View pane item
     * @param view The view to use for the model
     * @param viewRegistry Atom's ViewRegistry to use to connect the model layer
     * with the view layer
     * @param workspace To be used to open a new pane with the view
     */
    constructor(
        private title: string,
        private readonly view: HTMLView,
        private readonly viewRegistry: ViewRegistry,
        private readonly workspace: Workspace,
    ) {}

    /** Activate the model; register it and its view with the ViewRegistry */
    activate(): void {
        this.viewRegistry.addViewProvider(HTMLViewModel, () =>
            this.view.render(),
        );
    }

    /**
     * @returns The title of the HTML View pane item
     * @override
     */
    getTitle(): string {
        return this.title;
    }

    /**
     * @param title The title of the HTML View pane item
     */
    setTitle(title: string): void {
        this.title = title;
    }

    /**
     * Render HTML content in an HTML View pane
     *
     * @param content The content to render
     */
    async render(content: Node): Promise<void> {
        this.view.updateContent(content);
        await this.workspace.open(this, {
            split: 'right',
            searchAllPanes: true,
        });
    }
}
