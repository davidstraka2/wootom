import {TextEditor} from 'atom';
import {jumpToPosition} from '../../util/editor/jump-to-position';
import {ASTNode} from '../ast/ast-node';
import {VariableASTNode} from '../ast/variable-ast-node';

export class TableOfLabels {
    constructor(
        private readonly editor: TextEditor,
        private readonly root: ASTNode,
    ) {}

    render(): Node {
        const container = document.createDocumentFragment();
        const heading = document.createElement('h2');
        heading.append('Table of Labels');
        const list = document.createElement('ul');
        const labeledNodes = this.getLabeledNodes(this.root);
        this.sortLabeledNodes(labeledNodes);
        labeledNodes.forEach(node => list.append(this.renderLabel(node)));
        container.append(heading, list);
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
}
