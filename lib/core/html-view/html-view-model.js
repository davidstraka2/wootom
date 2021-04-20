"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLViewModel = void 0;
/** Handles the application logic of the HTML View pane item */
class HTMLViewModel {
    /**
     * @param title The title of the HTML View pane item
     * @param view The view to use for the model
     * @param viewRegistryAdder Used to connect the model layer with the view
     * layer
     * @param workspaceItemOpener To be used to open a new pane with the view
     */
    constructor(title, view, viewRegistryAdder, workspaceItemManager) {
        this.title = title;
        this.view = view;
        this.viewRegistryAdder = viewRegistryAdder;
        this.workspaceItemManager = workspaceItemManager;
    }
    /** Activate the model; register it and its view with the ViewRegistry */
    activate() {
        this.viewRegistryAdder.addViewProvider(HTMLViewModel, () => this.view.render());
    }
    get isOpen() {
        return this.workspaceItemManager.getPaneItems().includes(this);
    }
    /**
     * @returns The title of the HTML View pane item
     * @override
     */
    getTitle() {
        return this.title;
    }
    /**
     * @param title The title of the HTML View pane item
     */
    setTitle(title) {
        this.title = title;
    }
    close() {
        this.workspaceItemManager.hide(this);
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.workspaceItemManager.open(this, {
                split: 'right',
                searchAllPanes: true,
                activatePane: false,
                activateItem: false,
            });
        });
    }
    /**
     * Render HTML content in an HTML View pane
     *
     * @param content The content to render
     */
    render(content) {
        this.view.updateContent(content);
    }
}
exports.HTMLViewModel = HTMLViewModel;
