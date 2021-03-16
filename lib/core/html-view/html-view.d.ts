/** Handles the presentation of the HTML View pane item */
export declare class HTMLView {
    /** The container of the content of the view */
    private contentContainer;
    /**
     * Render the view
     *
     * @returns The HTML contents of the view
     */
    render(): HTMLElement;
    /**
     * Update the content of the view content container
     *
     * @param content The new content
     */
    updateContent(content: Node): void;
    /** Clear the contents of the view content container */
    private clear;
}
