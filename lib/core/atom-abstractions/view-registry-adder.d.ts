/** Creates the association between models and views */
export interface ViewRegistryAdder {
    /**
     * Add a provider that will be used to construct views in the workspace's
     * view layer based on model objects in its model layer.
     *
     * @param ModelConstructor The constructor of the Model
     * @param createView A function which creating an HTML view
     */
    addViewProvider<T>(ModelConstructor: {
        new (...args: any[]): T;
    }, createView: (instance: T) => HTMLElement): void;
}
