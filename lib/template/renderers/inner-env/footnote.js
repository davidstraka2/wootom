"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnerEnvFootnoteRenderer = void 0;
/** Renderer of the footnote inner environment */
class InnerEnvFootnoteRenderer {
    constructor() {
        this.kind = 'InnerEnv';
        this.abstractVariant = 'footnote';
    }
    render(renderingManager, astNode) {
        const footnote = document.createElement('span');
        footnote.classList.add('wootom-footnote');
        const controls = document.createElement('span');
        controls.classList.add('wootom-footnote-controls');
        controls.addEventListener('click', () => footnote.classList.toggle('wootom-footnote-shown'));
        const content = document.createElement('span');
        content.append(renderingManager.render(...astNode.children));
        footnote.append(controls, content);
        return footnote;
    }
}
exports.InnerEnvFootnoteRenderer = InnerEnvFootnoteRenderer;
