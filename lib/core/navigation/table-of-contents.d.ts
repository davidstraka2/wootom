import { TextEditor } from 'atom';
import { DocumentPart } from '../ast/document-part';
import { RenderingManager } from '../rendering/rendering-manager';
export declare class TableOfContents {
    private readonly editor;
    private readonly renderingManager;
    private readonly documentParts;
    private list;
    private searchInput;
    private searchResults;
    constructor(editor: TextEditor, renderingManager: Required<RenderingManager>, documentParts: DocumentPart[]);
    render(): Node;
    private renderTreeNode;
    private renderHeading;
    private getLevel;
    private constructHeadingTree;
    private renderSearchResults;
    private search;
}
