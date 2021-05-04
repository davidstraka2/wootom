import {ViewRegistryAdder} from '../atom-abstractions/view-registry-adder';
import {WorkspaceItemManager} from '../atom-abstractions/workspace-item-manager';
import {HTMLView} from '../html-view/html-view';
import {HTMLViewModel} from '../html-view/html-view-model';

export class NavigationModel extends HTMLViewModel {
    /**
     * @param title The title of the HTML View pane item
     * @param view The view to use for the model
     * @param viewRegistryAdder Used to connect the model layer with the view
     * layer
     * @param workspaceItemOpener To be used to open a new pane with the view
     */
    constructor(
        title: string,
        view: Required<HTMLView>,
        viewRegistryAdder: ViewRegistryAdder,
        workspaceItemManager: WorkspaceItemManager,
    ) {
        super(title, view, viewRegistryAdder, workspaceItemManager);
    }

    /** Activate the model; register it and its view with the ViewRegistry */
    activate(): void {
        this.viewRegistryAdder.addViewProvider(NavigationModel, () =>
            this.view.render(),
        );
    }
}

export const navigationModel = new NavigationModel(
    'Wootom Navigation',
    new HTMLView(),
    atom.views,
    atom.workspace,
);
