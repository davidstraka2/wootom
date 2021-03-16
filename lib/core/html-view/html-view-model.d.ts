import { ViewModel } from 'atom';
import { ViewRegistryAdder } from '../atom-abstractions/view-registry-adder';
import { WorkspaceItemOpener } from '../atom-abstractions/workspace-item-opener';
import { HTMLView } from './html-view';
/** Handles the application logic of the HTML View pane item */
export declare class HTMLViewModel implements ViewModel {
    private title;
    private readonly view;
    private readonly viewRegistryAdder;
    private readonly workspaceItemOpener;
    /**
     * @param title The title of the HTML View pane item
     * @param view The view to use for the model
     * @param viewRegistryAdder Used to connect the model layer with the view
     * layer
     * @param workspaceItemOpener To be used to open a new pane with the view
     */
    constructor(title: string, view: Required<HTMLView>, viewRegistryAdder: ViewRegistryAdder, workspaceItemOpener: WorkspaceItemOpener);
    /** Activate the model; register it and its view with the ViewRegistry */
    activate(): void;
    /**
     * @returns The title of the HTML View pane item
     * @override
     */
    getTitle(): string;
    /**
     * @param title The title of the HTML View pane item
     */
    setTitle(title: string): void;
    /**
     * Render HTML content in an HTML View pane
     *
     * @param content The content to render
     */
    render(content: Node): Promise<void>;
}
