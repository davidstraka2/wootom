"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLView = void 0;
/** Handles the presentation of the HTML View pane item */
class HTMLView {
    constructor() {
        /** The container of the content of the view */
        this.contentContainer = (() => {
            const div = document.createElement('div');
            div.classList.add('wootom-html-viewer');
            div.style.setProperty('overflow-y', 'auto');
            return div;
        })();
    }
    /**
     * Render the view
     *
     * @returns The HTML contents of the view
     */
    render() {
        return this.contentContainer;
    }
    /**
     * Update the content of the view content container
     *
     * @param content The new content
     */
    updateContent(content) {
        this.clear();
        this.contentContainer.appendChild(content);
    }
    /** Clear the contents of the view content container */
    clear() {
        while (this.contentContainer.lastChild !== null) {
            this.contentContainer.removeChild(this.contentContainer.lastChild);
        }
    }
}
exports.HTMLView = HTMLView;
