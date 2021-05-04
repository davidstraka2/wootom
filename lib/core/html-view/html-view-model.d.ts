import { ViewModel } from 'atom';
import { ViewRegistryAdder } from '../atom-abstractions/view-registry-adder';
import { WorkspaceItemManager } from '../atom-abstractions/workspace-item-manager';
import { HTMLView } from './html-view';
/** Handles the application logic of the HTML View pane item */
export declare class HTMLViewModel implements ViewModel {
    protected title: string;
    protected readonly view: Required<HTMLView>;
    protected readonly viewRegistryAdder: ViewRegistryAdder;
    protected readonly workspaceItemManager: WorkspaceItemManager;
    /**
     * @param title The title of the HTML View pane item
     * @param view The view to use for the model
     * @param viewRegistryAdder Used to connect the model layer with the view
     * layer
     * @param workspaceItemOpener To be used to open a new pane with the view
     */
    constructor(title: string, view: Required<HTMLView>, viewRegistryAdder: ViewRegistryAdder, workspaceItemManager: WorkspaceItemManager);
    /** Activate the model; register it and its view with the ViewRegistry */
    activate(): void;
    get isOpen(): boolean;
    /**
     * @returns The title of the HTML View pane item
     * @override
     */
    getTitle(): string;
    /**
     * @param title The title of the HTML View pane item
     */
    setTitle(title: string): void;
    close(): void;
    open(): Promise<void>;
    /**
     * Render HTML content in an HTML View pane
     *
     * @param content The content to render
     */
    render(content: Node): void;
}
