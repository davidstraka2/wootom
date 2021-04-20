"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OuterEnvQuoteRenderer = void 0;
class OuterEnvQuoteRenderer {
    constructor() {
        this.kind = 'OuterEnv';
        this.abstractVariant = 'quote';
    }
    render(renderingManager, astNode) {
        const blockquote = document.createElement('blockquote');
        blockquote.append(renderingManager.render(...astNode.children));
        const author = astNode.getMetadata('author');
        if (typeof author === 'string') {
            const cite = document.createElement('cite');
            const link = astNode.getMetadata('link');
            if (typeof link === 'string') {
                const a = document.createElement('a');
                a.href = link;
                a.append(author);
                cite.appendChild(a);
            }
            else {
                cite.append(author);
            }
            blockquote.append(cite);
        }
        return blockquote;
    }
}
exports.OuterEnvQuoteRenderer = OuterEnvQuoteRenderer;
