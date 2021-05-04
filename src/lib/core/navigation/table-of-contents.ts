import {TextEditor} from 'atom';
import {variantRegistry} from '..';
import {jumpToPosition} from '../../util/editor/jump-to-position';
import {DocumentPart} from '../ast/document-part';
import {RenderingManager} from '../rendering/rendering-manager';

type HeadingTreeNode = {
    node: DocumentPart | undefined;
    children: HeadingTreeNode[];
};

export class TableOfContents {
    constructor(
        private readonly editor: TextEditor,
        private readonly renderingManager: Required<RenderingManager>,
        private readonly documentParts: DocumentPart[],
    ) {}

    render(): Node {
        const container = document.createDocumentFragment();
        const heading = document.createElement('h2');
        heading.append('Table of Contents');
        const list = document.createElement('ol');
        const headingTree = this.constructHeadingTree(this.documentParts);
        headingTree.forEach(node => list.append(this.renderTreeNode(node)));
        container.append(heading, list);
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
}
