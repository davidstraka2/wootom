import {TextEditor} from 'atom';
import {variantRegistry} from '..';
import {jumpToPosition} from '../../util/editor/jump-to-position';
import {DocumentPart} from '../ast/document-part';
import {RenderingManager} from '../rendering/rendering-manager';
import Fuse from 'fuse.js';
import {removeAllChildren} from '../../util/html/remove-all-children';

type HeadingTreeNode = {
    node: DocumentPart | undefined;
    children: HeadingTreeNode[];
};

export class TableOfContents {
    private list: HTMLElement;
    private searchInput: HTMLInputElement;
    private searchResults: HTMLElement;

    constructor(
        private readonly editor: TextEditor,
        private readonly renderingManager: Required<RenderingManager>,
        private readonly documentParts: DocumentPart[],
    ) {
        this.list = document.createElement('ol');
        this.searchInput = document.createElement('input');
        this.searchResults = document.createElement('ul');
    }

    render(): Node {
        const container = document.createDocumentFragment();
        const heading = document.createElement('h2');
        heading.append('Table of Contents');
        this.searchInput.classList.add('native-key-bindings', 'wootom-search');
        this.searchInput.setAttribute(
            'placeholder',
            'Type here to search in table of contents...',
        );
        this.searchInput.addEventListener('input', this.search.bind(this));
        const headingTree = this.constructHeadingTree(this.documentParts);
        headingTree.forEach(node =>
            this.list.append(this.renderTreeNode(node)),
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

    private renderTreeNode(treeNode: HeadingTreeNode): Node {
        const listItem = document.createElement('li');
        if (typeof treeNode.node !== 'undefined')
            listItem.appendChild(this.renderHeading(treeNode.node));
        if (treeNode.children.length > 0) {
            const list = document.createElement('ol');
            for (const child of treeNode.children)
                list.appendChild(this.renderTreeNode(child));
            listItem.appendChild(list);
        }
        return listItem;
    }

    private renderHeading(documentPart: DocumentPart): Node {
        const anchor = document.createElement('a');
        documentPart.children.forEach(child =>
            anchor.append(this.renderingManager.render(child)),
        );
        anchor.addEventListener('click', () => {
            jumpToPosition(
                this.editor,
                documentPart.startLine,
                documentPart.startColumn,
            );
        });
        return anchor;
    }

    private getLevel(documentPart: DocumentPart): number {
        const variant = variantRegistry.getAbstractVariant(
            documentPart.kind,
            documentPart.variant,
        );
        switch (variant) {
            case 'h2':
                return 2;
            case 'h3':
                return 3;
            default:
                return 1;
        }
    }

    private constructHeadingTree(
        documentParts: DocumentPart[],
        level = 1,
    ): HeadingTreeNode[] {
        if (level < 1 || level > 3 || documentParts.length === 0) return [];

        const headingNode = documentParts[0];
        if (this.getLevel(headingNode) > level)
            return [
                {
                    node: undefined,
                    children: this.constructHeadingTree(
                        documentParts,
                        level + 1,
                    ),
                },
            ];

        const restNodes = documentParts.slice(1);
        const nextSameLevelHeadingIndex = restNodes.findIndex(
            headingNode => this.getLevel(headingNode) === level,
        );

        if (nextSameLevelHeadingIndex === -1)
            return [
                {
                    node: headingNode,
                    children: this.constructHeadingTree(restNodes, level + 1),
                },
            ];

        return [
            {
                node: headingNode,
                children: this.constructHeadingTree(
                    restNodes.slice(0, nextSameLevelHeadingIndex),
                    level + 1,
                ),
            },
            ...this.constructHeadingTree(
                restNodes.slice(nextSameLevelHeadingIndex),
                level,
            ),
        ];
    }

    private renderSearchResults(results: DocumentPart[]): Node[] {
        return results.map(res => {
            const listItem = document.createElement('li');
            listItem.append(this.renderHeading(res));
            return listItem;
        });
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
            this.documentParts.map(part => ({
                text: this.renderingManager.render(part).textContent ?? '',
                part,
            })),
            {
                ignoreLocation: true,
                keys: ['text'],
            },
        );

        const results = fuse.search(query);
        this.searchResults.append(
            ...this.renderSearchResults(results.map(res => res.item.part)),
        );
    }
}
