/** Handles the presentation of the HTML View pane item */
export class HTMLView {
    /** The container of the content of the view */
    private contentContainer: HTMLElement = (() => {
        const div = document.createElement('div');
        div.classList.add('wootom-html-viewer');
        div.style.setProperty('overflow-y', 'auto');
        return div;
    })();

    /**
     * Render the view
     *
     * @returns The HTML contents of the view
     */
    render(): HTMLElement {
        return this.contentContainer;
    }

    /**
     * Update the content of the view content container
     *
     * @param content The new content
     */
    updateContent(content: Node): void {
        this.clear();
        this.contentContainer.appendChild(content);
    }

    /** Clear the contents of the view content container */
    private clear() {
        while (this.contentContainer.lastChild !== null) {
            this.contentContainer.removeChild(this.contentContainer.lastChild);
        }
    }
}
