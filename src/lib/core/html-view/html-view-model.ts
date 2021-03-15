import {ViewModel} from 'atom';
import {ViewRegistryAdder} from '../atom-abstractions/view-registry-adder';
import {WorkspaceItemOpener} from '../atom-abstractions/workspace-item-opener';

import {HTMLView} from './html-view';

/** Handles the application logic of the HTML View pane item */
export class HTMLViewModel implements ViewModel {
    /**
     * @param title The title of the HTML View pane item
     * @param view The view to use for the model
     * @param viewRegistryAdder Used to connect the model layer with the view
     * layer
     * @param workspaceItemOpener To be used to open a new pane with the view
     */
    constructor(
        private title: string,
        private readonly view: Required<HTMLView>,
        private readonly viewRegistryAdder: ViewRegistryAdder,
        private readonly workspaceItemOpener: WorkspaceItemOpener,
    ) {}

    /** Activate the model; register it and its view with the ViewRegistry */
    activate(): void {
        this.viewRegistryAdder.addViewProvider(HTMLViewModel, () =>
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
        await this.workspaceItemOpener.open(this, {
            split: 'right',
            searchAllPanes: true,
        });
    }
}
