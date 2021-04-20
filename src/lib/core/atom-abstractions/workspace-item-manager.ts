import {ViewModel, WorkspaceOpenOptions} from 'atom';

/** Can open and close a ViewModel item, and get a list of open items */
export interface WorkspaceItemManager {
    getPaneItems(): unknown[];

    hide<T extends ViewModel = ViewModel>(item: T): boolean;

    /**
     * Open the given item. If the item is already open, the existing item will
     * be activated.
     *
     * @param item The ViewModel item to be opened
     * @param options Options for the opening operation
     */
    open<T extends ViewModel = ViewModel>(
        item: T,
        options?: WorkspaceOpenOptions,
    ): Promise<T>;
}
