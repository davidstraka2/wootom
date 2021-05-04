"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navigation = void 0;
const table_of_contents_1 = require("./table-of-contents");
const table_of_labels_1 = require("./table-of-labels");
class Navigation {
    constructor(editor, renderingManager, root) {
        this.editor = editor;
        this.renderingManager = renderingManager;
        this.root = root;
        this.documentParts = root.children.filter(child => child.kind === 'DocumentPart');
    }
    render() {
        const container = document.createElement('div');
        container.classList.add('wootom-navigation');
        const heading = document.createElement('h1');
        heading.append('Navigation');
        const toc = new table_of_contents_1.TableOfContents(this.editor, this.renderingManager, this.documentParts);
        const tol = new table_of_labels_1.TableOfLabels(this.editor, this.root);
        container.append(heading, toc.render(), tol.render());
        return container;
    }
}
exports.Navigation = Navigation;
