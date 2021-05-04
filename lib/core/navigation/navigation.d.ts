import { TextEditor } from 'atom';
import { ASTNode } from '../ast/ast-node';
import { RenderingManager } from '../rendering/rendering-manager';
export declare class Navigation {
    private readonly editor;
    private readonly renderingManager;
    private readonly root;
    private documentParts;
    constructor(editor: TextEditor, renderingManager: Required<RenderingManager>, root: ASTNode);
    render(): Node;
}
