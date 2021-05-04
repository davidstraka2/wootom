import {TextEditor} from 'atom';
import {ASTNode} from '../ast/ast-node';
import {DocumentPart} from '../ast/document-part';
import {RenderingManager} from '../rendering/rendering-manager';
import {TableOfContents} from './table-of-contents';
import {TableOfLabels} from './table-of-labels';

export class Navigation {
    private documentParts: DocumentPart[];

    constructor(
        private readonly editor: TextEditor,
        private readonly renderingManager: Required<RenderingManager>,
        private readonly root: ASTNode,
    ) {
        this.documentParts = root.children.filter(
            child => child.kind === 'DocumentPart',
        ) as DocumentPart[];
    }

    render(): Node {
        const container = document.createDocumentFragment();
        const heading = document.createElement('h1');
        heading.append('Navigation');
        const toc = new TableOfContents(
            this.editor,
            this.renderingManager,
            this.documentParts,
        );
        const tol = new TableOfLabels(this.editor, this.root);
        container.append(heading, toc.render(), tol.render());
        return container;
    }
}
