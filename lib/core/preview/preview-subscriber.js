"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviewSubscriber = void 0;
const atom_1 = require("atom");
class PreviewSubscriber {
    constructor(htmlViewModel, parser, renderingManager, workspaceObserver) {
        this.htmlViewModel = htmlViewModel;
        this.parser = parser;
        this.renderingManager = renderingManager;
        this.workspaceObserver = workspaceObserver;
        this.editorSubscriptions = new atom_1.CompositeDisposable();
        this.workspaceSubscriptions = new atom_1.CompositeDisposable();
    }
    activate() {
        this.workspaceSubscriptions.add(this.workspaceObserver.onDidChangeActiveTextEditor(this.updateEditor.bind(this)));
    }
    deactivate() {
        this.contentCache = undefined;
        this.editor = undefined;
        this.editorSubscriptions.dispose();
        this.workspaceSubscriptions.dispose();
    }
    toggle() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.htmlViewModel.isOpen) {
                console.log('Wootom: Closing preview pane.');
                this.htmlViewModel.close();
            }
            else {
                console.log('Wootom: Opening preview pane.');
                yield this.htmlViewModel.open();
            }
        });
    }
    updateContent() {
        if (typeof this.editor === 'undefined' || !this.htmlViewModel.isOpen) {
            return;
        }
        const content = this.editor.getText();
        if (typeof this.contentCache === 'undefined' ||
            this.contentCache !== content) {
            console.log('Wootom: Rendering content preview.');
            this.contentCache = content;
            const documentRoot = this.parser.parse(content);
            const html = this.renderingManager.render(documentRoot);
            this.htmlViewModel.render(html);
            document.dispatchEvent(new CustomEvent('wootom-preview-rendered'));
        }
        else {
            console.log('Wootom: Hit content cache.');
        }
    }
    updateEditor(editor) {
        this.contentCache = undefined;
        this.editorSubscriptions.dispose();
        this.editor = editor;
        if (typeof editor === 'undefined') {
            console.log('Wootom: Unsubscribing from text editor.');
            return;
        }
        console.log('Wootom: Subscribing to new editor.');
        this.editorSubscriptions.add(editor.onDidSave(this.updateContent.bind(this)), editor.onDidStopChanging(() => {
            if (atom.config.get('wootom.updateOnType'))
                this.updateContent();
        }));
        this.updateContent();
    }
}
exports.PreviewSubscriber = PreviewSubscriber;
