import { WorkspaceObserver } from '../atom-abstractions/workspace-observer';
import { HTMLViewModel } from '../html-view/html-view-model';
import { Parser } from '../parser/parser';
import { RenderingManager } from '../rendering/rendering-manager';
export declare class NavigationSubscriber {
    private readonly htmlViewModel;
    private readonly parser;
    private readonly renderingManager;
    private readonly workspaceObserver;
    private contentCache;
    private editor;
    private editorSubscriptions;
    private workspaceSubscriptions;
    constructor(htmlViewModel: Required<HTMLViewModel>, parser: Required<Parser>, renderingManager: Required<RenderingManager>, workspaceObserver: WorkspaceObserver);
    activate(): void;
    deactivate(): void;
    toggle(): Promise<void>;
    private updateContent;
    private updateEditor;
}
