import {TextEditor} from 'atom';
import {jumpToPosition} from '../../util/editor/jump-to-position';
import {removeAllChildren} from '../../util/html/remove-all-children';
import {ASTNode} from '../ast/ast-node';
import {VariableASTNode} from '../ast/variable-ast-node';
import Fuse from 'fuse.js';

export class TableOfLabels {
    private labeledNodes: ASTNode[];
    private list: HTMLElement;
    private searchInput: HTMLInputElement;
    private searchResults: HTMLElement;

    constructor(
        private readonly editor: TextEditor,
        private readonly root: ASTNode,
    ) {
        this.labeledNodes = this.getLabeledNodes(this.root);
        this.sortLabeledNodes(this.labeledNodes);
        this.list = document.createElement('ul');
        this.searchInput = document.createElement('input');
        this.searchResults = document.createElement('ul');
    }

    render(): Node {
        const container = document.createDocumentFragment();
        const heading = document.createElement('h2');
        heading.append('Table of Labels');
        this.searchInput.classList.add('native-key-bindings', 'wootom-search');
        this.searchInput.setAttribute(
            'placeholder',
            'Type here to search in labels...',
        );
        this.searchInput.addEventListener('input', this.search.bind(this));
        this.labeledNodes.forEach(node =>
            this.list.append(this.renderLabel(node)),
        );
        this.searchResults.hidden = true;
        container.append(
            heading,
            this.searchInput,
            this.list,
            this.searchResults,
        );
        return container;
    }

    private getLabeledNodes(astNode: ASTNode): ASTNode[] {
        const labeled = [];
        const label = astNode.getMetadata('label');
        if (typeof label === 'string' && label.trim().length > 0) {
            labeled.push(astNode);
        }
        astNode.children.forEach(child =>
            labeled.push(...this.getLabeledNodes(child)),
        );
        return labeled;
    }

    private getLabel(labeledNode: ASTNode): string {
        return labeledNode.getMetadata('label') as string;
    }

    private sortLabeledNodes(labeledNodes: ASTNode[]): void {
        labeledNodes.sort((a, b) =>
            this.getLabel(a).localeCompare(this.getLabel(b)),
        );
    }

    private renderLabel(labeledNode: ASTNode): Node {
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        const b = document.createElement('strong');
        b.append(this.getLabel(labeledNode));
        const i = document.createElement('em');
        let text = ` (`;
        text += labeledNode.kind;
        if (labeledNode instanceof VariableASTNode)
            text += ` - ${labeledNode.variant}`;
        text += ` on line ${labeledNode.startLine})`;
        i.append(text);
        anchor.append(b, i);
        anchor.addEventListener('click', () => {
            jumpToPosition(
                this.editor,
                labeledNode.startLine,
                labeledNode.startColumn,
            );
        });
        listItem.append(anchor);
        return listItem;
    }

    private renderSearchResults(results: ASTNode[]): Node[] {
        return results.map(res => this.renderLabel(res));
    }

    private search(): void {
        const query = this.searchInput.value.trim();
        if (query.length === 0) {
            this.list.hidden = false;
            this.searchResults.hidden = true;
            return;
        }
        this.list.hidden = true;
        this.searchResults.hidden = false;
        removeAllChildren(this.searchResults);

        const fuse = new Fuse(
            this.labeledNodes.map(node => ({label: this.getLabel(node), node})),
            {
                ignoreLocation: true,
                keys: ['label'],
            },
        );

        const results = fuse.search(query);
        this.searchResults.append(
            ...this.renderSearchResults(results.map(res => res.item.node)),
        );
    }
}
