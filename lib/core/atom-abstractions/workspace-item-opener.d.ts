import { ViewModel, WorkspaceOpenOptions } from 'atom';
/** Opens a ViewModel item */
export interface WorkspaceItemOpener {
    /**
     * Open the given item. If the item is already open, the existing item will
     * be activated.
     *
     * @param item The ViewModel item to be opened
     * @param options Options for the opening operation
     */
    open<T extends ViewModel = ViewModel>(item: T, options?: WorkspaceOpenOptions): Promise<T>;
}
