import { TextEditor } from 'atom';
import { ASTNode } from '../ast/ast-node';
export declare class TableOfLabels {
    private readonly editor;
    private readonly root;
    private labeledNodes;
    private list;
    private searchInput;
    private searchResults;
    constructor(editor: TextEditor, root: ASTNode);
    render(): Node;
    private getLabeledNodes;
    private getLabel;
    private sortLabeledNodes;
    private renderLabel;
    private renderSearchResults;
    private search;
}
