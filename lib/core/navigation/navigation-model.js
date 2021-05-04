"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.navigationModel = exports.NavigationModel = void 0;
const html_view_1 = require("../html-view/html-view");
const html_view_model_1 = require("../html-view/html-view-model");
class NavigationModel extends html_view_model_1.HTMLViewModel {
    /**
     * @param title The title of the HTML View pane item
     * @param view The view to use for the model
     * @param viewRegistryAdder Used to connect the model layer with the view
     * layer
     * @param workspaceItemOpener To be used to open a new pane with the view
     */
    constructor(title, view, viewRegistryAdder, workspaceItemManager) {
        super(title, view, viewRegistryAdder, workspaceItemManager);
    }
    /** Activate the model; register it and its view with the ViewRegistry */
    activate() {
        this.viewRegistryAdder.addViewProvider(NavigationModel, () => this.view.render());
    }
}
exports.NavigationModel = NavigationModel;
exports.navigationModel = new NavigationModel('Wootom Navigation', new html_view_1.HTMLView(), atom.views, atom.workspace);
