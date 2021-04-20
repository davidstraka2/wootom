"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultInnerEnvRenderer = void 0;
class DefaultInnerEnvRenderer {
    constructor() {
        this.kind = 'InnerEnv';
    }
    render(renderingManager, astNode) {
        const innerEnv = astNode;
        const fragment = document.createDocumentFragment();
        const begin = document.createElement('span');
        begin.classList.add('wootom-error-inline');
        begin.append('Unknown inner environment "');
        fragment.append(begin);
        fragment.append(renderingManager.render(...innerEnv.children));
        const end = document.createElement('span');
        end.classList.add('wootom-error-inline');
        end.append(`".${innerEnv.variant}`);
        fragment.append(end);
        return fragment;
    }
}
exports.DefaultInnerEnvRenderer = DefaultInnerEnvRenderer;
